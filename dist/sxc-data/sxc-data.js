"use strict";
exports.__esModule = true;
var content_1 = require("./content");
var query_1 = require("./query");
var SxcData = /** @class */ (function () {
    function SxcData(http) {
        this.http = http;
    }
    SxcData.prototype.content = function (contentType) {
        return new content_1.Content(this.http, contentType);
    };
    SxcData.prototype.query = function (name) {
        return new query_1.Query(this.http, name);
    };
    return SxcData;
}());
exports.SxcData = SxcData;
