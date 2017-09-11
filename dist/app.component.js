"use strict";
exports.__esModule = true;
// This is a base class for all apps which run in DNN.
// It ensures that the rest of the parts depending on DNN parameters are correctly initialized.
/**
 * A root app component which initializes the context-providers once the app is loaded
 * This is the earliest moment we can access the ElementRef, because before that
 * it's not attached to the DOM, so auto-detect wouldn't work.
 */
var AppComponent = /** @class */ (function () {
    function AppComponent(element, context) {
        context.autoConfigure(element);
    }
    return AppComponent;
}());
exports.AppComponent = AppComponent;
