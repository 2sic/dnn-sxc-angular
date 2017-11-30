import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Context } from './context/context.service';
import { Data } from './sxc/data';
import { DevContext } from './context/dev-context';
import { DnnInterceptor } from './http/dnn.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    Data,
    DevContext,
    Context,
    DnnInterceptor,
  ]
})
export class DnnSxcModule { }