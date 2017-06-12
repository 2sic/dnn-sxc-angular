"use strict";
exports.__esModule = true;
var sxc_http_1 = require("./sxc-http");
var http_1 = require("@angular/http");
var sxc_angular_service_1 = require("./sxc-angular.service");
function DnnHttpProviderFactory(backend, defaultOptions, sxc) {
    return new sxc_http_1.SxcHttp(backend, defaultOptions, sxc);
}
exports.DnnHttpProviderFactory = DnnHttpProviderFactory;
exports.SxcHttpProvider = {
    provide: http_1.Http,
    useFactory: DnnHttpProviderFactory,
    deps: [http_1.XHRBackend, http_1.RequestOptions, sxc_angular_service_1.SxcAngular]
};
exports.DnnHttpProvider = {
    provide: http_1.Http,
    useFactory: DnnHttpProviderFactory,
    deps: [http_1.XHRBackend, http_1.RequestOptions, sxc_angular_service_1.DnnAngular]
};
//# sourceMappingURL=sxc-http.provider.js.map