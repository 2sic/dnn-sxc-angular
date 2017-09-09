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
    function Interceptor(handler, context) {
        this.context = context;
    }
    Interceptor.prototype.intercept = function (req, next) {
        // todo: add code here instead
        return next.handle(req);
    };
    Interceptor = __decorate([
        core_1.Injectable()
    ], Interceptor);
    return Interceptor;
}());
exports.Interceptor = Interceptor;
