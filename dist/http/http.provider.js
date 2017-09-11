"use strict";
exports.__esModule = true;
var http_1 = require("@angular/common/http");
var context_service_1 = require("../context/context.service");
var sxc_http_client_1 = require("./sxc-http-client");
exports.HttpProvider = {
    provide: http_1.HttpClient,
    useFactory: HttpProviderFactory,
    deps: [http_1.HttpHandler, context_service_1.Context]
};
function HttpProviderFactory(handler, sxc) {
    return new sxc_http_client_1.DnnHttpClient(handler, sxc);
}
exports.HttpProviderFactory = HttpProviderFactory;
