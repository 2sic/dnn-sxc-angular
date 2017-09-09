"use strict";
exports.__esModule = true;
var http_1 = require("@angular/common/http");
var __1 = require("..");
var sxc_http_client_1 = require("./sxc-http-client");
exports.HttpProvider = {
    provide: http_1.HttpClient,
    useFactory: HttpProviderFactory,
    deps: [http_1.HttpHandler, __1.Context]
};
function HttpProviderFactory(handler, sxc) {
    return new sxc_http_client_1.SxcHttpClient(handler, sxc);
}
exports.HttpProviderFactory = HttpProviderFactory;
