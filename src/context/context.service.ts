import { ContextInfo } from './context-info';
import { RuntimeSettings } from './runtime-settings';
import { ElementRef, Injectable, Optional } from '@angular/core';
import { Observable, combineLatest, from, timer, BehaviorSubject, Subject } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { SxcInstance } from '../interfaces/sxc-instance';
import { SxcController } from '@2sic.com/2sxc-typings';
import { map, take, last, tap, first } from 'rxjs/operators';
import { appTag } from '../names';

declare const window: any;

@Injectable({
    providedIn: 'root',
})
export class Context {
    private globSxc: SxcController;
    // todo: probably should set the replay-buffer to 1 for all the following, but must test!
    private midSubject = new ReplaySubject<number>(1);
    private tidSubject = new ReplaySubject<number>(1);
    private cbIdSubject = new ReplaySubject<number>(1);
    private afTokenSubject = new ReplaySubject<string>(1);
    private sxcSubject = new ReplaySubject<SxcInstance>(1);
    private runtimeSettingsSubject = new ReplaySubject<RuntimeSettings>(1);


    moduleId$ = this.midSubject.asObservable();
    tabId$ = this.tidSubject.asObservable();
    contentBlockId$ = this.cbIdSubject.asObservable();
    antiForgeryToken$ = this.afTokenSubject.pipe(first());
    sxc$ = this.sxcSubject.asObservable();
    sxcController$: Observable<SxcController>;
    runtimeSettings$ = this.runtimeSettingsSubject.asObservable();
    edition$ = new BehaviorSubject<string>(null);
    apiEdition$ = new BehaviorSubject<string>(null);

    all$ = combineLatest(
        this.moduleId$,             // wait for module id
        this.tabId$,                // wait for tabId
        this.contentBlockId$,       // wait for content-block id
        this.sxc$,                  // wait for sxc instance
        this.antiForgeryToken$,
        this.runtimeSettings$,      // wait for security token
        (mid, tid, cbid, sxc, aft, runtime) => <ContextInfo>{  // then merge streams
            moduleId: mid,// res[0],
            tabId: tid,// res[1],
            contentBlockId: cbid,// res[2],
            sxc: sxc,// res[3],
            antiForgeryToken: aft,// res[4],
            path: runtime.path,// res[5].path,
            addDnnHeaders: runtime.addDnnHeaders,// res[5].addDnnHeaders,
            appNameInPath: runtime.appNameInPath,// res[5].appNameInPath,
            withCredentials: runtime.withCredentials,// res[5].withCredentials
        });

    constructor(
        @Optional() private runtimeSettings: RuntimeSettings
    ) {
        // debug
        // this.antiForgeryToken$.subscribe(aft => console.log('got new aft:', aft));

        // Dev settings with minimal ignore settings.
        this.runtimeSettings = Object.assign({}, {
            ignoreMissing$2sxc: false,
            ignoreMissingServicesFramework: false,
            addDnnHeaders: true
        }, runtimeSettings);

        this.globSxc = <SxcController>window.$2sxc;
        if (this.globSxc === undefined && !runtimeSettings.ignoreMissing$2sxc) {
            throw new Error('window.$2sxc is null - you probably forgot to include the script before loading angular');
        }
        
        this.sxcController$ = from([this.globSxc]); // must cast to any, otherwise I get strange typscript errors :(
    }

    /**
     * Configure 2sxc in the context of a HTMLNode.
     * @param htmlNode the HTMLNode
     */
    autoConfigure(htmlNode: ElementRef) {
        this.getContextFromAppTag(htmlNode);
        this.runtimeSettingsSubject.next(this.runtimeSettings);
        var settings = {...this.runtimeSettings} as RuntimeSettings;

        if(!settings.moduleId) {
            const sxc = settings.sxc ? settings.sxc : <SxcInstance>this.globSxc(htmlNode.nativeElement);
            if (sxc === undefined || sxc === null) {
                throw new Error('couldn\'t get sxc instance - reason unknown');
            }
            
            settings = {
                sxc: sxc,
                moduleId: sxc.id,
                contentBlockId: sxc.cbid,
                ...settings
            }
        }

        this.midSubject.next(settings.moduleId);
        this.cbIdSubject.next(settings.contentBlockId ? settings.contentBlockId : settings.moduleId);

        // Check if DNN Services framework exists.
        if (!settings.tabId && window.$ && window.$.ServicesFramework) {
            this.tryToInitializeWithTimer(settings);
            return;
        }

        if (!this.runtimeSettings.ignoreMissingServicesFramework) {
            throw new Error(`
                DNN Services Framework is missing, and it\'s not allowed according to runtimeSettings.
                Either set runtimeSettings to ignore this, or ensure it\'s there`);
        }

        // If Services Framework is not needed, provide values directly
        this.tidSubject.next(settings.tabId);
        this.afTokenSubject.next(settings.antiForgeryToken);
        this.sxcSubject.next(settings.sxc);
    }

    private tryToInitializeWithTimer(settings: RuntimeSettings) {
        const tries = 30;
        const interval = 100;
        // Run timer till sf is ready, but max for three seconds.
        const t = timer(0, interval)
            .pipe(take(tries))
            .subscribe(x => {
                // This must be accessed after a delay, as the SF is not ready yet.
                const sf = window.$.ServicesFramework(settings.moduleId);
                // Check if sf is initialized.
                if (sf.getAntiForgeryValue() && sf.getTabId() !== -1) {
                    t.unsubscribe();
                    this.initFromWorkingDnnSf(sf, settings);
                }
                else {
                    // Must reset, as they are incorrectly initialized when accessed early.
                    if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                        window.dnn.vars = null;
                    }
                    // If we've reached the end of the timer sequence, polling did likely not succeeed
                    if (x == tries - 1)
                        console.log("Polling for $.ServicesFramework did not succeed after 3 seconds.");
                }
            });
    }

    private initFromWorkingDnnSf(sf: any, settings: RuntimeSettings) {
        this.tidSubject.next(sf.getTabId());
        // try to do this only if it's not already available!
        this.afTokenSubject.next(settings.antiForgeryToken ? settings.antiForgeryToken : sf.getAntiForgeryValue());
        // Access to sxc must happen after initializing DNN sf - if settings.moduleId was missing,
        // sxc has already been accessed. To circumvent this, we need to recreate the sxc.
        // settings.sxc = settings.sxc.recreate(); <-- does not work
        settings.sxc.serviceRoot = sf.getServiceRoot("2sxc"); // <-- works
        // Provide sxc after sf has been initialized because it also depends on it
        this.sxcSubject.next(settings.sxc);
    }

    private getContextFromAppTag(el: ElementRef) {
        this.initFromAppTag(el, appTag.edition, this.edition$);
        this.initFromAppTag(el, appTag.apiEdition, this.apiEdition$);
        this.initFromAppTag(el, appTag.antiForgeryToken, this.afTokenSubject);
        this.initFromAppTag(el, appTag.tabId, this.tidSubject);
        this.initFromAppTag(el, appTag.moduleId, this.midSubject);
        this.initFromAppTag(el, appTag.contentBlockId, this.cbIdSubject);

        console.log('edition', this.edition$.value);
        this.afTokenSubject.pipe(take(1), tap(x => console.log('aft', x))).subscribe();    

    }

    private initFromAppTag<T>(
        el: ElementRef, 
        attribute: string, 
        target: Subject<T>) {
        const value = el.nativeElement.getAttribute(attribute);
        if(value) target.next(value);
    }
}
