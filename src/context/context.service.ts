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

const runtimeDefaults: Partial<RuntimeSettings> = {
    ignoreMissing$2sxc: false,
    ignoreMissingServicesFramework: false,
    addDnnHeaders: true
};

const asyncInitAttempts = 30;
const asyncInitAttemptInterval = 100;

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

    /** the edition can be null, but it can also have a value */
    edition$ = new BehaviorSubject<string>(null);

    /** the apiEdition can be null, but it can also have a value */
    apiEdition$ = new BehaviorSubject<string>(null);

    all$ = combineLatest(
        this.moduleId$,             // wait for module id
        this.tabId$,                // wait for tabId
        this.contentBlockId$,       // wait for content-block id
        this.sxc$,                  // wait for sxc instance
        this.antiForgeryToken$,     // wait for security token
        this.edition$,
        this.apiEdition$,
        this.runtimeSettings$,
        // then merge streams
        (moduleId, tabId, contentBlockId, sxc, antiForgeryToken, edition, apiEdition, settings) => <ContextInfo> {
            moduleId: moduleId,
            tabId: tabId,
            contentBlockId: contentBlockId,
            sxc: sxc,
            antiForgeryToken: antiForgeryToken,
            path: settings.path,
            addDnnHeaders: settings.addDnnHeaders,
            appNameInPath: settings.appNameInPath,
            withCredentials: settings.withCredentials,
            edition: edition,
            apiEdition: apiEdition,
        });

    constructor(
        @Optional() private runtimeSettings: RuntimeSettings
    ) {
        // build settings with default ignore-settings and overrides from project
        this.runtimeSettings = Object.assign({}, runtimeDefaults, runtimeSettings);
        this.runtimeSettingsSubject.next(this.runtimeSettings);

        this.globSxc = <SxcController>window.$2sxc;
        if (this.globSxc === undefined && !this.runtimeSettings.ignoreMissing$2sxc) {
            throw new Error('window.$2sxc is null - you probably forgot to include the script before loading angular');
        }

        this.sxcController$ = from([this.globSxc]);
    }

    /**
     * Configure 2sxc in the context of a HTMLNode.
     * @param htmlNode the HTMLNode
     */
    autoConfigure(htmlNode: ElementRef) {
        this.getContextFromAppTag(htmlNode);
        let settings = {...this.runtimeSettings} as RuntimeSettings;

        if (!settings.moduleId) {
            const sxc = settings.sxc || <SxcInstance>this.globSxc(htmlNode.nativeElement);
            if (sxc === undefined || sxc === null) {
                throw new Error('couldn\'t get sxc instance - reason unknown');
            }

            settings = {
                sxc: sxc,
                moduleId: sxc.id,
                contentBlockId: sxc.cbid,
                ...settings
            };
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

    /**
     * Try to initialize all properties which are not available initially
     */
    private tryToInitializeWithTimer(settings: RuntimeSettings) {
        // Run timer till sf is ready, but max for three seconds.
        const t = timer(0, asyncInitAttemptInterval)
            .pipe(take(asyncInitAttempts))
            .subscribe(x => {
                // This must be accessed after a delay, as the SF is not ready yet.
                const sf = window.$.ServicesFramework(settings.moduleId);
                // Check if sf is initialized.
                if (sf.getAntiForgeryValue() && sf.getTabId() !== -1) {
                    t.unsubscribe();
                    this.initFromWorkingDnnSf(sf, settings);
                } else {
                    // Must reset, as they are incorrectly initialized when accessed early.
                    if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                        window.dnn.vars = null;
                    }
                    // If we've reached the end of the timer sequence, polling did likely not succeeed
                    if (x === asyncInitAttempts - 1) {
                        console.log('Polling for $.ServicesFramework did not succeed after 3 seconds.');
                    }
                }
            });
    }

    private initFromWorkingDnnSf(sf: any, settings: RuntimeSettings) {
        this.tidSubject.next(sf.getTabId());

        // try to do this only if it's not already available!
        this.afTokenSubject.next(settings.antiForgeryToken ? settings.antiForgeryToken : sf.getAntiForgeryValue());

        // Access to sxc must happen after initializing DNN sf - if settings.moduleId was missing,
        // sxc has already been accessed. To circumvent this, we need to re-attach the SF to sxc.
        // Important: settings.sxc = settings.sxc.recreate(); <-- does not work
        settings.sxc.serviceRoot = sf.getServiceRoot('2sxc'); // <-- works

        // Provide sxc after sf has been initialized because it also depends on it
        this.sxcSubject.next(settings.sxc);
    }

    /**
     * Get context information like module-id from the app-root tag
     * new in Dnn-Sxc-Angular 8
     */
    private getContextFromAppTag(el: ElementRef) {
        // 2019-09-29 2dm important now
        this.initFromAppTag(el, appTag.edition, this.edition$);
        this.initFromAppTag(el, appTag.apiEdition, this.apiEdition$);

        // 2019-09-29 2dm important later
        this.initFromAppTag(el, appTag.antiForgeryToken, this.afTokenSubject);
        this.initFromAppTag(el, appTag.tabId, this.tidSubject);
        this.initFromAppTag(el, appTag.moduleId, this.midSubject);
        this.initFromAppTag(el, appTag.contentBlockId, this.cbIdSubject);

        // Debugging - disable when working
        // console.log('edition', this.edition$.value);
        // this.afTokenSubject.pipe(take(1), tap(x => console.log('aft', x))).subscribe();

    }

    private initFromAppTag<T>(
        el: ElementRef,
        attribute: string,
        target: Subject<T>) {
            // todo: after upgrading to NG8, probably use el.GetAttribute
            const value = el.nativeElement.getAttribute(attribute);
            if (value) { target.next(value); }
    }
}
