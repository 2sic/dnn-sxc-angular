"use strict";
exports.__esModule = true;
var http_1 = require("@angular/common/http");
var ContentResource = /** @class */ (function () {
    function ContentResource(http, typeName) {
        this.http = http;
        this.typeName = typeName;
    }
    ContentResource.prototype.get = function (id) {
        if (id === void 0) { id = null; }
        var url = "app/auto/content/" + this.typeName;
        if (id) {
            url += "/" + id;
        }
        var headers = new http_1.HttpHeaders();
        return this.http.get(url, { headers: headers });
    };
    return ContentResource;
}());
exports.ContentResource = ContentResource;
