import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Context } from "../index";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    handler: HttpHandler,
    private context: Context
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // todo: add code here instead
    return next.handle(req);
  }
}
