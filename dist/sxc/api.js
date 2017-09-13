"use strict";
exports.__esModule = true;
var Api = /** @class */ (function () {
    function Api(http, controller) {
        this.http = http;
        this.controller = controller;
        console.warn("important: 2sxc-data.api isn't fully tested yet.");
    }
    /**
     * will retrieve a 2sxc query
     * remember to set the permissions on the query, so it can be accessed by the group you want
     */
    Api.prototype.get = function (method, params) {
        var url = "app/auto/api/" + this.controller + "/" + method;
        return this.http.get(url, { params: params });
    };
    return Api;
}());
exports.Api = Api;
