"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Interceptor = /** @class */ (function () {
    function Interceptor(context) {
        this.context = context;
    }
    Interceptor.prototype.intercept = function (req, next) {
        // const result = new Subject<HttpEvent<any>>();
        return this.context.all.take(1)
            .flatMap(function (ctx) {
            // Clone the request and update the url with 2sxc params.
            var newReq = req.clone({
                url: ctx.sxc.resolveServiceUrl(req.url),
                setHeaders: {
                    ModuleId: ctx.moduleId.toString(),
                    TabId: ctx.tabId.toString(),
                    ContentBlockId: ctx.contentBlockId.toString(),
                    RequestVerificationToken: ctx.antiForgeryToken,
                    'X-Debugging-Hint': 'bootstrapped by Sxc4Angular'
                }
            });
            return next.handle(newReq);
        });
    };
    Interceptor = __decorate([
        core_1.Injectable()
    ], Interceptor);
    return Interceptor;
}());
exports.Interceptor = Interceptor;
