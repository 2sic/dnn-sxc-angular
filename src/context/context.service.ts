import { ContextInfo } from './context-info';
import { DevContext as DevContext } from './dev-context';
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
    private devContextSubject = new ReplaySubject<DevContext>(1);

    moduleId$ = this.midSubject.asObservable();
    tabId$ = this.tidSubject.asObservable();
    contentBlockId$ = this.cbIdSubject.asObservable();
    antiForgeryToken$ = this.afTokenSubject.asObservable();
    sxc$ = this.sxcSubject.asObservable();
    sxcController$: Observable<SxcController>;
    devContext$ = this.devContextSubject.asObservable();

    all$ = combineLatest(
        this.moduleId$,             // wait for module id
        this.tabId$,                // wait for tabId
        this.contentBlockId$,       // wait for content-block id
        this.sxc$,                  // wait for sxc instance
        this.antiForgeryToken$,
        this.devContext$)     // wait for security token
        .pipe(map(res => <ContextInfo>{  // then merge streams
            moduleId: res[0],
            tabId: res[1],
            contentBlockId: res[2],
            sxc: res[3],
            antiForgeryToken: res[4],
            path: res[5].path,
            disableHeaders: res[5].disableHeaders,
            appNameInPath: res[5].appNameInPath
        }));

    constructor(
        @Optional() private devSettings: DevContext
    ) {

        // Dev settings with minimal ignore settings.
        this.devSettings = Object.assign({}, {
            ignoreMissing$2sxc: false,
            ignoreMissingServicesFramework: false
        }, devSettings);

        this.globSxc = <SxcController>window.$2sxc;
        if (this.globSxc === undefined && !devSettings.ignoreMissing$2sxc) {
            throw new Error('window.$2sxc is null - you probably forgot to include the script before loading angular');
        }
        
        this.sxcController$ = from([this.globSxc]); // must cast to any, otherwise I get strange typscript errors :(
    }

    /**
     * Configure 2sxc in the context of a HTMLNode.
     * @param htmlNode the HTMLNode
     */
    autoConfigure(htmlNode: ElementRef) {
        this.devContextSubject.next(this.devSettings);
        var settings = {...this.devSettings};
        
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
        this.sxcSubject.next(settings.sxc);

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

        if (!this.devSettings.ignoreMissingServicesFramework) {
            throw new Error(`
                DNN Services Framework is missing, and it\'s not allowed according to devSettings.
                Either set devSettings to ignore this, or ensure it\'s there`);
        }

        // If Services Framework is not needed, provide values directly
        this.tidSubject.next(settings.tabId);
        this.afTokenSubject.next(settings.antiForgeryToken);
    }
}
