"use strict";
exports.__esModule = true;
var Query = /** @class */ (function () {
    function Query(http, name) {
        this.http = http;
        this.name = name;
    }
    /**
     * will retrieve a 2sxc query
     * remember to set the permissions on the query, so it can be accessed by the group you want
     */
    Query.prototype.get = function (params) {
        var url = "app/auto/query/" + this.name;
        return this.http.get(url, { params: params });
    };
    return Query;
}());
exports.Query = Query;
