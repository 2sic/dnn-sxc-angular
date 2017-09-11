import { Context } from './context/context.service';
import { ElementRef } from '@angular/core';

// This is a base class for all apps which run in DNN.
// It ensures that the rest of the parts depending on DNN parameters are correctly initialized.

/**
 * A root app component which initializes the context-providers once the app is loaded
 * This is the earliest moment we can access the ElementRef, because before that 
 * it's not attached to the DOM, so auto-detect wouldn't work.
 */
export class AppComponent {
  constructor(
    element: ElementRef,
    context: Context,
  ) {
    context.autoConfigure(element);
  }
}
