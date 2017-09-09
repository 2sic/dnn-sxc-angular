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
var di_1 = require("@angular/core/src/di");
var Data = /** @class */ (function () {
    function Data(http) {
        this.http = http;
    }
    Data.prototype.content = function (contentType) {
        return new content_1.Content(this.http, contentType);
    };
    Data.prototype.query = function (name) {
        return new query_1.Query(this.http, name);
    };
    Data = __decorate([
        di_1.Injectable()
    ], Data);
    return Data;
}());
exports.Data = Data;
