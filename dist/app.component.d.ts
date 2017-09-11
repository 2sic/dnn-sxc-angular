import { ElementRef } from '@angular/core';
import { Context } from "./context/context.service";
/**
 * A root app component which initializes the context-providers once the app is loaded
 * This is the earliest moment we can access the ElementRef, because before that
 * it's not attached to the DOM, so auto-detect wouldn't work.
 */
export declare class AppComponent {
    constructor(element: ElementRef, context: Context);
}
