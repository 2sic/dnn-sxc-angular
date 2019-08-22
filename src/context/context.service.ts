import { ContextInfo } from './context-info';
import { RuntimeSettings } from './runtime-settings';
import { ElementRef, Injectable, Optional } from '@angular/core';
import { Observable, combineLatest, from, timer } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { SxcInstance } from '../interfaces/sxc-instance';
import { SxcController } from '@2sic.com/2sxc-typings';
import { map, take, last } from 'rxjs/operators';

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
    antiForgeryToken$ = this.afTokenSubject.asObservable();
    sxc$ = this.sxcSubject.asObservable();
    sxcController$: Observable<SxcController>;
    runtimeSettings$ = this.runtimeSettingsSubject.asObservable();

    all$ = combineLatest(
        this.moduleId$,             // wait for module id
        this.tabId$,                // wait for tabId
        this.contentBlockId$,       // wait for content-block id
        this.sxc$,                  // wait for sxc instance
        this.antiForgeryToken$,
        this.runtimeSettings$)     // wait for security token
        .pipe(map(res => <ContextInfo>{  // then merge streams
            moduleId: res[0],
            tabId: res[1],
            contentBlockId: res[2],
            sxc: res[3],
            antiForgeryToken: res[4],
            path: res[5].path,
            addDnnHeaders: res[5].addDnnHeaders,
            appNameInPath: res[5].appNameInPath,
            withCredentials: res[5].withCredentials
        }));

    constructor(
        @Optional() private runtimeSettings: RuntimeSettings
    ) {

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
        this.runtimeSettingsSubject.next(this.runtimeSettings);
        var settings = {...this.runtimeSettings};

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
            const tries = 30;
            const interval = 100;

            // Run timer till sf is ready, but max for three seconds.
            const t = timer(0, interval)
                .pipe(take(tries))
                .subscribe(x => {
                    
                    // This must be accessed after a delay, as the SF is not ready yet.
                    const sf = window.$.ServicesFramework(/* this.sxcInstance */ settings.moduleId);

                    // Check if sf is initialized.
                    if (sf.getAntiForgeryValue() && sf.getTabId() !== -1) {
                        t.unsubscribe();

                        this.tidSubject.next(sf.getTabId());
                        this.afTokenSubject.next(settings.antiForgeryToken ? settings.antiForgeryToken : sf.getAntiForgeryValue());

                        // Access to sxc must happen after initializing DNN sf - if settings.moduleId was missing,
                        // sxc has already been accessed. To circumvent this, we need to recreate the sxc.
                        
                        //settings.sxc = settings.sxc.recreate(); <-- does not work
                        settings.sxc.serviceRoot = sf.getServiceRoot("2sxc"); // <-- works

                        // Provide sxc after sf has been initialized because it also depends on it
                        this.sxcSubject.next(settings.sxc);
                    } else {
                        // Must reset, as they are incorrectly initialized when accessed early.
                        if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                            window.dnn.vars = null;
                        }
                        
                        // If we've reached the end of the timer sequence, polling did likely not succeeed
                        if(x == tries - 1) console.log("Polling for $.ServicesFramework did not succeed after 3 seconds.");

                    }
                });
            
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
}
