import {SxcAngular} from './sxc-angular.service';
// This is a base class for all apps which run in DNN.
// It ensures that the rest of the parts depending on DNN parameters are correctly initialized
import { ElementRef } from '@angular/core';

export class SxcAppComponent {
  constructor(
    element: ElementRef,
    sxcNg: SxcAngular
  ) {
    sxcNg.autoConfigure(element);
  }
}

// export class DnnAppComponent extends SxcAppComponent { }