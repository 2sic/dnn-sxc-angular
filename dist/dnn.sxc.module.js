"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var context_service_1 = require("./context/context.service");
var dnn_interceptor_1 = require("./http/dnn.interceptor");
var data_1 = require("./sxc/data");
var DnnSxcModule = /** @class */ (function () {
    function DnnSxcModule() {
    }
    DnnSxcModule = __decorate([
        core_1.NgModule({
            providers: [
                context_service_1.Context,
                dnn_interceptor_1.DnnInterceptor,
                data_1.Data,
            ]
        })
    ], DnnSxcModule);
    return DnnSxcModule;
}());
exports.DnnSxcModule = DnnSxcModule;
