"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var rxjs_1 = require("rxjs");
var SxcAngular = (function () {
    function SxcAngular(devSettings) {
        var _this = this;
        this.devSettings = devSettings;
        this.midSubject = new rxjs_1.ReplaySubject();
        this.tidSubject = new rxjs_1.ReplaySubject();
        this.cbIdSubject = new rxjs_1.ReplaySubject();
        this.afTokenSubject = new rxjs_1.ReplaySubject();
        this.contextSubject = new rxjs_1.ReplaySubject();
        this.sxcSubject = new rxjs_1.ReplaySubject();
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
        this.globSxc = window.$2sxc;
        if (this.globSxc == undefined && !devSettings.ignoreMissing$2sxc)
            throw 'window.$2sxc is null - you probably forgot to include the script before loading angular';
        rxjs_1.Observable.combineLatest(this.moduleId, this.tabId, this.contentBlockId, this.sxc, this.antiForgeryToken)
            .subscribe(function (res) { return _this.contextSubject.next({
            moduleId: res[0],
            tabId: res[1],
            contentBlockId: res[2],
            sxc: res[3],
            antiForgeryToken: res[4]
        }); });
    }
    SxcAngular.prototype.autoConfigure = function (htmlNode) {
        var _this = this;
        // no global $2sxc found
        if (!this.globSxc) {
            if (!this.devSettings.ignoreMissing$2sxc)
                throw 'cannot autoConfigure - missing $2sxc';
            this.midSubject.next(this.devSettings.moduleId);
            this.tidSubject.next(this.devSettings.tabId);
            this.cbIdSubject.next(0);
            return;
        }
        var sxc = this.sxcInstance = this.globSxc(htmlNode.nativeElement);
        if (sxc == undefined || sxc == null)
            throw 'couldn\'t get sxc instance - reason unknown';
        // Update / publish moduleId.
        this.midSubject.next(sxc.id);
        this.cbIdSubject.next(sxc.cbid);
        this.sxcSubject.next(sxc);
        // Check if DNN Services framework exists.
        if (window.$ && window.$.ServicesFramework) {
            // Run timer till sf is ready, but max for a second
            var timer_1 = rxjs_1.Observable.timer(0, 100)
                .take(10)
                .subscribe(function (x) {
                // This must be accessed after a delay, as the SF is not ready yet.
                var sf = window.$.ServicesFramework(_this.sxcInstance.id);
                // check if sf is initialized
                if (sf.getAntiForgeryValue()) {
                    timer_1.unsubscribe();
                    // must reset, as they are incorrectly initialized when accessed early
                    if (window.dnn && window.dnn.vars && window.dnn.vars.length == 0)
                        window.dnn.vars = null;
                    _this.tidSubject.next(sf.getTabId());
                    _this.afTokenSubject.next(sf.getAntiForgeryValue());
                }
            });
            return;
        }
        if (!this.devSettings.ignoreMissingServicesFramework)
            throw "DNN Services Framework is missing, and it's not allowed according to devSettings. Either set devSettings to ignore this, or ensure it's there";
        this.tidSubject.next(this.devSettings.tabId);
        this.afTokenSubject.next(this.devSettings.antiForgeryToken);
    };
    return SxcAngular;
}());
SxcAngular = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Optional())
], SxcAngular);
exports.SxcAngular = SxcAngular;
var DnnAngular = (function (_super) {
    __extends(DnnAngular, _super);
    function DnnAngular() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DnnAngular;
}(SxcAngular));
exports.DnnAngular = DnnAngular;
;
