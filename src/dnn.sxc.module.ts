import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Context } from "./context/context.service";
import { DnnInterceptor } from "./http/dnn.interceptor";
import { Data } from "./sxc/data";

@NgModule({
  providers: [
    Context,
    DnnInterceptor,    
    Data,
  ]
})
export class DnnSxcModule { }