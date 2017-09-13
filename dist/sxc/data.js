"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var content_1 = require("./content");
var query_1 = require("./query");
var core_1 = require("@angular/core");
var api_1 = require("./api");
/**
 * 2sxc data provider
 * gives you access to content and query streams using the content$ and query$ commands
 * you can also use the content and query managers, but these are currently not so useful
 */
var Data = /** @class */ (function () {
    function Data(http) {
        this.http = http;
    }
    /**
     * get a content manager object
     * usually you will prefer the the observable stream content$
     * this manager is currently included for consistency, and will later also offer write commands
     * @param contentType name of the content-type
     */
    Data.prototype.content = function (contentType) {
        return new content_1.Content(this.http, contentType);
    };
    Data.prototype.content$ = function (contentType, id) {
        if (id === void 0) { id = null; }
        return new content_1.Content(this.http, contentType).get(id);
    };
    /**
     * get a query object to then start queries
     * usually you'll be better off using the observable stream query$, this is included primarily for consistency in the api
     * @param name the query name
     * @returns a query object with a .get()
     */
    Data.prototype.query = function (name) {
        return new query_1.Query(this.http, name);
    };
    /**
     * retrieve a query stream from the server
     * @param name the query name
     * @param params optional parameters-object
     * @returns a typed observable which will give you the query
     */
    Data.prototype.query$ = function (name, params) {
        return new query_1.Query(this.http, name).get(params);
    };
    /**
     * get an api object to then start api-calls
     * usually you'll be better off using the observable stream api$, this is included primarily for consistency in the api
     * @param controller the api controller
     * @returns a query object with a .get()
     */
    Data.prototype.api = function (controller) {
        return new api_1.Api(this.http, controller);
    };
    /**
     * retrieve a api stream from the server
     * @param name the method name
     * @param params optional parameters-object
     * @returns a typed observable which will give you the query
     */
    Data.prototype.api$ = function (name, params) {
        return new api_1.Api(this.http, name).get(name, params);
    };
    Data = __decorate([
        core_1.Injectable()
    ], Data);
    return Data;
}());
exports.Data = Data;
