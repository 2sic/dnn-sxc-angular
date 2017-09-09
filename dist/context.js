"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/combineLatest");
require("rxjs/add/observable/timer");
require("rxjs/Rx");
var Context = /** @class */ (function () {
    function Context(devSettings) {
        var _this = this;
        this.devSettings = devSettings;
        this.midSubject = new ReplaySubject_1.ReplaySubject();
        this.tidSubject = new ReplaySubject_1.ReplaySubject();
        this.cbIdSubject = new ReplaySubject_1.ReplaySubject();
        this.afTokenSubject = new ReplaySubject_1.ReplaySubject();
        this.contextSubject = new ReplaySubject_1.ReplaySubject();
        this.sxcSubject = new ReplaySubject_1.ReplaySubject();
        this.moduleId = this.midSubject.asObservable();
        this.tabId = this.tidSubject.asObservable();
        this.contentBlockId = this.cbIdSubject.asObservable();
        this.antiForgeryToken = this.afTokenSubject.asObservable();
        this.sxc = this.sxcSubject.asObservable();
        this.complete = this.contextSubject.asObservable();
        // Dev settings with minimal ignore settings.
        devSettings = Object.assign({}, {
            ignoreMissing$2sxc: false,
            ignoreMissingServicesFramework: false
        }, devSettings);
        this.globSxc = window.$2sxc;
        if (this.globSxc === undefined && !devSettings.ignoreMissing$2sxc) {
            throw new Error('window.$2sxc is null - you probably forgot to include the script before loading angular');
        }
        Observable_1.Observable.combineLatest(this.moduleId, this.tabId, this.contentBlockId, this.sxc, this.antiForgeryToken)
            .subscribe(function (res) { return _this.contextSubject.next({
            moduleId: res[0],
            tabId: res[1],
            contentBlockId: res[2],
            sxc: res[3],
            antiForgeryToken: res[4]
        }); });
    }
    /**
     * Configure 2sxc in the context of a HTMLNode.
     * @param htmlNode the HTMLNode
     */
    Context.prototype.autoConfigure = function (htmlNode) {
        var _this = this;
        // No global $2sxc found.
        if (!this.globSxc) {
            if (!this.devSettings.ignoreMissing$2sxc) {
                throw new Error('cannot autoConfigure - missing $2sxc which helps auto-detect the module - make sure you include 2sxc.min.js');
            }
            this.midSubject.next(this.devSettings.moduleId);
            this.tidSubject.next(this.devSettings.tabId);
            this.cbIdSubject.next(0);
            return;
        }
        var sxc = this.sxcInstance = this.globSxc(htmlNode.nativeElement);
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
            var timer_1 = Observable_1.Observable.timer(0, 100)
                .take(10)
                .subscribe(function (x) {
                // This must be accessed after a delay, as the SF is not ready yet.
                var sf = window.$.ServicesFramework(_this.sxcInstance.id);
                // Check if sf is initialized.
                if (sf.getAntiForgeryValue()) {
                    timer_1.unsubscribe();
                    _this.tidSubject.next(sf.getTabId());
                    _this.afTokenSubject.next(sf.getAntiForgeryValue());
                }
                else {
                    // Must reset, as they are incorrectly initialized when accessed early.
                    if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                        window.dnn.vars = null;
                    }
                }
            });
            return;
        }
        if (!this.devSettings.ignoreMissingServicesFramework) {
            throw new Error("\n                DNN Services Framework is missing, and it's not allowed according to devSettings.\n                Either set devSettings to ignore this, or ensure it's there");
        }
        this.tidSubject.next(this.devSettings.tabId);
        this.afTokenSubject.next(this.devSettings.antiForgeryToken);
    };
    Context = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional())
    ], Context);
    return Context;
}());
exports.Context = Context;
// export class DnnAngular extends SxcAngular { };
