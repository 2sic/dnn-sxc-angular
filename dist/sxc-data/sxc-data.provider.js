"use strict";
exports.__esModule = true;
var http_1 = require("@angular/common/http");
var sxc_data_1 = require("./sxc-data");
exports.SxcDataProvider = {
    provide: sxc_data_1.SxcData,
    useFactory: SxcDataProviderFactory,
    deps: [http_1.HttpClient]
};
function SxcDataProviderFactory(http) {
    return new sxc_data_1.SxcData(http);
}
exports.SxcDataProviderFactory = SxcDataProviderFactory;
