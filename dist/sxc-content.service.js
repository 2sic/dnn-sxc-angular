"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ContentResourceFactory = (function () {
    function ContentResourceFactory(http) {
        this.http = http;
    }
    ContentResourceFactory.prototype.resource = function (typeName) {
        return new ContentResource(this.http, typeName);
    };
    return ContentResourceFactory;
}());
ContentResourceFactory = __decorate([
    core_1.Injectable()
], ContentResourceFactory);
exports.ContentResourceFactory = ContentResourceFactory;
var ContentResource = (function () {
    function ContentResource(http, typeName) {
        this.http = http;
        this.typeName = typeName;
    }
    ContentResource.prototype.get = function (id) {
        if (id === void 0) { id = null; }
        var url = "app/auto/content/" + this.typeName;
        if (id)
            url += "/" + id;
        var headers = new http_1.Headers();
        return this.http.get(url, { headers: headers });
    };
    return ContentResource;
}());
ContentResource = __decorate([
    core_1.Injectable()
], ContentResource);
exports.ContentResource = ContentResource;
//# sourceMappingURL=sxc-content.service.js.map