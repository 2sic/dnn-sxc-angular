import { ElementRef, Optional, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/timer';
import 'rxjs/Rx';
import { SxcInstance } from "../interfaces/sxc-instance";
import { Dev } from "./dev-context";
import { ContextInfo } from "./context-info";

declare const window: any;

@Injectable()
export class Context {
    private globSxc: any;
    private midSubject = new ReplaySubject<number>();
    private tidSubject = new ReplaySubject<number>();
    private cbIdSubject = new ReplaySubject<number>();
    private afTokenSubject = new ReplaySubject<string>();
    private sxcSubject = new ReplaySubject<SxcInstance>();
    private sxcInstance: SxcInstance;
    private contextSubject = new ReplaySubject<ContextInfo>();
   
    all = this.contextSubject.asObservable();
    moduleId = this.midSubject.asObservable();
    tabId = this.tidSubject.asObservable();
    contentBlockId = this.cbIdSubject.asObservable();
    antiForgeryToken = this.afTokenSubject.asObservable();
    sxc = this.sxcSubject.asObservable();


    constructor(
        @Optional() private devSettings: Dev
    ) {
        // Dev settings with minimal ignore settings.
        devSettings = Object.assign({}, {
            ignoreMissing$2sxc: false,
            ignoreMissingServicesFramework: false
        }, devSettings);

        this.globSxc = <any>window.$2sxc;
        if (this.globSxc === undefined && !devSettings.ignoreMissing$2sxc) {
            throw new Error('window.$2sxc is null - you probably forgot to include the script before loading angular');
        }

        Observable.combineLatest(this.moduleId, this.tabId, this.contentBlockId, this.sxc, this.antiForgeryToken)
            .subscribe(res => this.contextSubject.next(<ContextInfo>{
                moduleId: res[0],
                tabId: res[1],
                contentBlockId: res[2],
                sxc: res[3],
                antiForgeryToken: res[4]
            }));
    }

    /**
     * Configure 2sxc in the context of a HTMLNode.
     * @param htmlNode the HTMLNode
     */
    autoConfigure(htmlNode: ElementRef) {

        // No global $2sxc found.
        if (!this.globSxc) {
            if (!this.devSettings.ignoreMissing$2sxc) {
                throw new Error('cannot autoConfigure - missing $2sxc which helps auto-detect the module - make sure you include 2sxc.min.js');
            }

            // just provide dev/debug settings
            this.midSubject.next(this.devSettings.moduleId);
            this.tidSubject.next(this.devSettings.tabId);
            this.cbIdSubject.next(0);
            return;
        }

        const sxc = this.sxcInstance = <SxcInstance>this.globSxc(htmlNode.nativeElement);
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
                    const sf = window.$.ServicesFramework(this.sxcInstance.id);

                    // Check if sf is initialized.
                    if (sf.getAntiForgeryValue()) {
                        timer.unsubscribe();

                        this.tidSubject.next(sf.getTabId());
                        this.afTokenSubject.next(sf.getAntiForgeryValue());
                    }
                    else{
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

// export class DnnAngular extends SxcAngular { };
