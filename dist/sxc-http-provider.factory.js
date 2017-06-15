"use strict";
exports.__esModule = true;
var sxc_http_1 = require("./sxc-http");
function SxcHttpProviderFactory(backend, defaultOptions, sxc) {
    return new sxc_http_1.SxcHttp(backend, defaultOptions, sxc);
}
exports.SxcHttpProviderFactory = SxcHttpProviderFactory;
