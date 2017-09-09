"use strict";
exports.__esModule = true;
var sxc_content_resource_1 = require("./sxc-content-resource");
var SxcData = /** @class */ (function () {
    function SxcData(http) {
        this.http = http;
    }
    SxcData.prototype.content = function (typeName) {
        return new sxc_content_resource_1.ContentResource(this.http, typeName);
    };
    SxcData.prototype.query = function () {
        throw new Error('Qery not implemented yet.');
    };
    return SxcData;
}());
exports.SxcData = SxcData;
