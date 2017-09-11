"use strict";
exports.__esModule = true;
var Query = /** @class */ (function () {
    function Query(http, name) {
        this.http = http;
        this.name = name;
    }
    Query.prototype.get = function () {
        var url = "app/auto/query/" + this.name;
        return this.http.get(url);
    };
    return Query;
}());
exports.Query = Query;
