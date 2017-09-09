"use strict";
exports.__esModule = true;
var http_1 = require("@angular/common/http");
var sxc_http_1 = require("./sxc-http");
var _1 = require(".");
exports.HttpProvider = {
    provide: http_1.HttpClient,
    useFactory: HttpProviderFactory,
    deps: [http_1.HttpHandler, _1.Context]
};
function HttpProviderFactory(handler, sxc) {
    return new sxc_http_1.SxcHttpClient(handler, sxc);
}
exports.HttpProviderFactory = HttpProviderFactory;
