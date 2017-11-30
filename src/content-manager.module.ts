import { CommonModule } from '@angular/common';
import { Context } from './context/context.service';
import { Data } from './sxc/data';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SxcToolbarDirective } from './beta/edit';

@NgModule({
  imports: [
    HttpClientModule
  ],
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