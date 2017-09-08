import { ElementRef, Optional, Injectable } from '@angular/core';
import { AppContext } from './app-context';
import { SxcInstance } from './sxc-instance';
import { DnnDevSettings } from './dev/dnn-dev-settings';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/timer';
import 'rxjs/Rx';

declare const window: any;

@Injectable()
export class SxcAngular {
    context: Observable<AppContext>;
    moduleId: Observable<number>;
    tabId: Observable<number>;
    contentBlockId: Observable<number>;
    antiForgeryToken: Observable<string>;
    sxc: Observable<SxcInstance>;

    private globSxc: any;
    private midSubject: ReplaySubject<number> = new ReplaySubject<number>();
    private tidSubject: ReplaySubject<number> = new ReplaySubject<number>();
    private cbIdSubject: ReplaySubject<number> = new ReplaySubject<number>();
    private afTokenSubject: ReplaySubject<string> = new ReplaySubject<string>();
    private contextSubject: ReplaySubject<AppContext> = new ReplaySubject<AppContext>();
    private sxcSubject: ReplaySubject<SxcInstance> = new ReplaySubject<SxcInstance>();
    private sxcInstance: SxcInstance;

    constructor(
        @Optional() private devSettings: DnnDevSettings
    ) {
        this.moduleId = this.midSubject.asObservable();
        this.tabId = this.tidSubject.asObservable();
        this.contentBlockId = this.cbIdSubject.asObservable();
        this.antiForgeryToken = this.afTokenSubject.asObservable();
        this.sxc = this.sxcSubject.asObservable();
        this.context = this.contextSubject.asObservable();

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
            .subscribe(res => this.contextSubject.next(<AppContext>{
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
                throw new Error('cannot autoConfigure - missing $2sxc');
            }
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

                        // Must reset, as they are incorrectly initialized when accessed early.
                        if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                            window.dnn.vars = null;
                        }

                        this.tidSubject.next(sf.getTabId());
                        this.afTokenSubject.next(sf.getAntiForgeryValue());
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
