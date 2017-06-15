// This is a base class for all apps which run in DNN.
// It ensures that the rest of the parts depending on DNN parameters are correctly initialized
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var SxcAppComponent = (function () {
    function SxcAppComponent(element, sxcNg) {
        sxcNg.autoConfigure(element);
    }
    return SxcAppComponent;
}());
exports.SxcAppComponent = SxcAppComponent;
var DnnAppComponent = (function (_super) {
    __extends(DnnAppComponent, _super);
    function DnnAppComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DnnAppComponent;
}(SxcAppComponent));
exports.DnnAppComponent = DnnAppComponent;
