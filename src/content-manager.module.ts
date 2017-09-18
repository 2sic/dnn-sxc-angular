import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Context } from "./context/context.service";
import { Data } from "./sxc/data";
import { SxcToolbarDirective } from './beta/edit';

@NgModule({
  declarations: [
    SxcToolbarDirective
  ],
  providers: [
    Context,
    Data,
  ],
  exports: [SxcToolbarDirective]
})
export class ContentManagerModule { }