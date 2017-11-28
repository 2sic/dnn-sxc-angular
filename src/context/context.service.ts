import { ContextInfo } from './context-info';
import { DevContext as DevContext } from './dev-context';
import { ElementRef, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { SxcInstance } from '../interfaces/sxc-instance';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/timer';
import 'rxjs/Rx';
// import '@2sic.com/2sxc-typings';

declare const window: any;

@Injectable()
export class Context {
    private globSxc: SxcController;
    // todo: probably should set the replay-buffer to 1 for all the following, but must test!
    private midSubject = new ReplaySubject<number>(1);
    private tidSubject = new ReplaySubject<number>(1);
    private cbIdSubject = new ReplaySubject<number>(1);
    private afTokenSubject = new ReplaySubject<string>(1);
    private sxcSubject = new ReplaySubject<SxcInstance>(1);

    moduleId$ = this.midSubject.asObservable();
    tabId$ = this.tidSubject.asObservable();
    contentBlockId$ = this.cbIdSubject.asObservable();
    antiForgeryToken$ = this.afTokenSubject.asObservable();
    sxc$ = this.sxcSubject.asObservable();
    sxcController$: Observable<SxcController>;

    all$ = Observable.combineLatest(
        this.moduleId$,             // wait for module id
        this.tabId$,                // wait for tabId
        this.contentBlockId$,       // wait for content-block id
        this.sxc$,                  // wait for sxc instance
        this.antiForgeryToken$)     // wait for security token
        .map(res => <ContextInfo>{  // then merge streams
            moduleId: res[0],
            tabId: res[1],
            contentBlockId: res[2],
            sxc: res[3],
            antiForgeryToken: res[4]
        });

    constructor(
        @Optional() private devSettings: DevContext
    ) {
        // Dev settings with minimal ignore settings.
        devSettings = Object.assign({}, {
            ignoreMissing$2sxc: false,
            ignoreMissingServicesFramework: false
        }, devSettings);

        this.globSxc = <SxcController>window.$2sxc;
        if (this.globSxc === undefined && !devSettings.ignoreMissing$2sxc) {
            throw new Error('window.$2sxc is null - you probably forgot to include the script before loading angular');
        }
        
        this.sxcController$ = Observable.from(this.globSxc as any); // must cast to any, otherwise I get strange typscript errors :(
    }

    /**
     * Configure 2sxc in the context of a HTMLNode.
     * @param htmlNode the HTMLNode
     */
    autoConfigure(htmlNode: ElementRef) {

        // No global $2sxc found - and no error was raised at the constructor
        if (!this.globSxc) {
            // just provide dev/debug settings
            this.midSubject.next(this.devSettings.moduleId);
            this.tidSubject.next(this.devSettings.tabId);
            this.cbIdSubject.next(0);
            return;
        }

        const sxc = <SxcInstance>this.globSxc(htmlNode.nativeElement);
        if (sxc === undefined || sxc === null) {
            throw new Error('couldn\'t get sxc instance - reason unknown');
        }

        // Update / publish moduleId.
        this.midSubject.next(sxc.id);
        this.cbIdSubject.next(sxc.cbid);
        this.sxcSubject.next(sxc);

        // Check if DNN Services framework exists.
        if (window.$ && window.$.ServicesFramework) {
 
            // Run timer till sf is ready, but max for a second.
            const timer = Observable.timer(0, 100)
                .take(10)
                .subscribe(x => {

                    // This must be accessed after a delay, as the SF is not ready yet.
                    const sf = window.$.ServicesFramework(/* this.sxcInstance */ sxc.id);

                    // Check if sf is initialized.
                    if (sf.getAntiForgeryValue() && sf.getTabId() !== -1) {
                        timer.unsubscribe();

                        this.tidSubject.next(sf.getTabId());
                        this.afTokenSubject.next(sf.getAntiForgeryValue());
                    } else {
                        // Must reset, as they are incorrectly initialized when accessed early.
                        if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                            window.dnn.vars = null;
                        }
                    }
                });
            return;
        }

        if (!this.devSettings.ignoreMissingServicesFramework) {
            throw new Error(`
                DNN Services Framework is missing, and it\'s not allowed according to devSettings.
                Either set devSettings to ignore this, or ensure it\'s there`);
        }

        this.tidSubject.next(this.devSettings.tabId);
        this.afTokenSubject.next(this.devSettings.antiForgeryToken);
    }
}
