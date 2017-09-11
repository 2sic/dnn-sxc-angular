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
        return this.http.get(url);
    };
    Content.prototype.post = function (id, data) {
        throw new Error('not implemented yet');
    };
    return Content;
}());
exports.Content = Content;
