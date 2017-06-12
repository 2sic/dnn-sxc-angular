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
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Subject_1 = require("rxjs/Subject");
var SxcHttp = (function (_super) {
    __extends(SxcHttp, _super);
    function SxcHttp(backend, defaultOptions, sxcNg) {
        var _this = _super.call(this, backend, defaultOptions) || this;
        _this.sxcNg = sxcNg;
        return _this;
    }
    SxcHttp.prototype.request = function (urlOrRequest, options) {
        var _this = this;
        if (options === void 0) { options = new http_1.RequestOptions(); }
        var subject = new Subject_1.Subject();
        this.sxcNg.context.take(1)
            .subscribe(function (res) {
            if (typeof urlOrRequest === 'string') {
                urlOrRequest = res.sxc.resolveServiceUrl(urlOrRequest);
                _this.configure(options, res);
            }
            else {
                urlOrRequest.url = res.sxc.resolveServiceUrl(urlOrRequest.url);
                _this.configure(urlOrRequest, res);
            }
            _super.prototype.request.call(_this, urlOrRequest)
                .subscribe(function (res) { return subject.next(res); });
        });
        return subject.asObservable();
    };
    SxcHttp.prototype.configure = function (options, params) {
        if (!options.headers)
            options.headers = new http_1.Headers();
        options.headers.append('ModuleId', params.moduleId.toString());
        options.headers.append('TabId', params.tabId.toString());
        options.headers.append('ContentBlockId', params.contentBlockId.toString());
        options.headers.append('RequestVerificationToken', params.antiForgeryToken);
        options.headers.append('X-Debugging-Hint', 'bootstrapped by Sxc4Angular');
        return options;
    };
    return SxcHttp;
}(http_1.Http));
SxcHttp = __decorate([
    core_1.Injectable()
], SxcHttp);
exports.SxcHttp = SxcHttp;
//# sourceMappingURL=sxc-http.js.map