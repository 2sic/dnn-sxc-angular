"use strict";
exports.__esModule = true;
var Content = /** @class */ (function () {
    function Content(http, contentType) {
        this.http = http;
        this.contentType = contentType;
    }
    Content.prototype.get = function (id) {
        if (id === void 0) { id = null; }
        var url = "app/auto/content/" + this.contentType;
        if (id) {
            url += "/" + id;
        }
        // const headers = new HttpHeaders();
        return this.http.get(url); //, { headers });
    };
    return Content;
}());
exports.Content = Content;
