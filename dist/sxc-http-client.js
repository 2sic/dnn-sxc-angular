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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var http_2 = require("@angular/common/http");
var Subject_1 = require("rxjs/Subject");
// todo: review if we should change the concept to an interceptor instead of an inject
var SxcHttpClient = /** @class */ (function (_super) {
    __extends(SxcHttpClient, _super);
    function SxcHttpClient(handler, sxcNg) {
        var _this = _super.call(this, handler) || this;
        _this.sxcNg = sxcNg;
        return _this;
    }
    /**
     * Perform a HTTP Request
     * @param first request
     * @param url request url
     * @param options request options
     */
    SxcHttpClient.prototype.request = function (first, url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var result = new Subject_1.Subject();
        console.log('request test', arguments);
        // Subscribe to the 2sxc context.
        this.sxcNg.complete.take(1)
            .subscribe(function (appContext) {
            var req;
            // Firstly, check whether the primary argument is an instance of `HttpRequest`.
            if (first instanceof http_2.HttpRequest) {
                req = first;
                // Clone the request and update the url with 2sxc params.
                req = req.clone({
                    url: appContext.sxc.resolveServiceUrl(req.url)
                });
            }
            else {
                // url = url || appContext.sxc.resolveServiceUrl(<string>first)
                // urlOrRequest = res.sxc.resolveServiceUrl(<string>first);
                first = appContext.sxc.resolveServiceUrl(first);
                console.log(first, url);
                // It's a string, so it represents a URL.
                req = new http_2.HttpRequest(first, url, options.body || null, {
                    headers: options.headers,
                    params: options.params,
                    reportProgress: options.reportProgress,
                    // By default, JSON is assumed to be returned for all calls.
                    responseType: options.responseType,
                    withCredentials: options.withCredentials
                });
            }
            _this.appendHeaders(options, appContext);
            _super.prototype.request.call(_this, req)
                .subscribe(function (res) { return result.next(res); });
        });
        return result.asObservable();
    };
    /**
     * Add 2sxc headers to the request.
     * @param options request options
     * @param appContext 2sxc appContext
     */
    SxcHttpClient.prototype.appendHeaders = function (options, appContext) {
        if (!options.headers) {
            options.headers = new http_1.HttpHeaders();
        }
        options.headers.append('ModuleId', appContext.moduleId.toString());
        options.headers.append('TabId', appContext.tabId.toString());
        options.headers.append('ContentBlockId', appContext.contentBlockId.toString());
        options.headers.append('RequestVerificationToken', appContext.antiForgeryToken);
        options.headers.append('X-Debugging-Hint', 'bootstrapped by Sxc4Angular');
        return options;
    };
    SxcHttpClient = __decorate([
        core_1.Injectable()
    ], SxcHttpClient);
    return SxcHttpClient;
}(http_1.HttpClient));
exports.SxcHttpClient = SxcHttpClient;
