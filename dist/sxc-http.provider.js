"use strict";
exports.__esModule = true;
var sxc_http_provider_factory_1 = require("./sxc-http-provider.factory");
var http_1 = require("@angular/http");
var sxc_angular_service_1 = require("./sxc-angular.service");
exports.SxcHttpProvider = {
    provide: http_1.Http,
    useFactory: sxc_http_provider_factory_1.SxcHttpProviderFactory,
    deps: [http_1.XHRBackend, http_1.RequestOptions, sxc_angular_service_1.SxcAngular]
};
exports.DnnHttpProvider = {
    provide: http_1.Http,
    useFactory: sxc_http_provider_factory_1.SxcHttpProviderFactory,
    deps: [http_1.XHRBackend, http_1.RequestOptions, sxc_angular_service_1.DnnAngular]
};
