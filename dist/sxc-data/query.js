"use strict";
exports.__esModule = true;
var Query = /** @class */ (function () {
    function Query(http, name) {
        this.http = http;
        this.name = name;
    }
    Query.prototype.get = function () {
        var url = "app/auto/query/" + this.name;
        // if (name) {
        //   url += `/${name}`;
        // }
        // const headers = new HttpHeaders();
        return this.http.get(url); //, { headers });
    };
    return Query;
}());
exports.Query = Query;
