"use strict";
exports.__esModule = true;
/**
 * A root app component which initializes the context-providers once the app is loaded
 * This is the earliest moment we can access the ElementRef, because before that
 * it's not attached to the DOM, so auto-detect wouldn't work.
 */
var SxcAppComponent = /** @class */ (function () {
    function SxcAppComponent(element, context) {
        context.autoConfigure(element);
    }
    return SxcAppComponent;
}());
exports.SxcAppComponent = SxcAppComponent;
