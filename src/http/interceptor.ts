import { ContextInfo } from '../context/context-info';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Context } from "../context/context.service";
import { Subject } from 'rxjs/Subject';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private context: Context
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const result = new Subject<HttpEvent<any>>();

    return this.context.all.take(1)
      .flatMap(ctx => {

        // Clone the request and update the url with 2sxc params.
        const newReq = req.clone({
          url: ctx.sxc.resolveServiceUrl(req.url),
          setHeaders: {
            ModuleId: ctx.moduleId.toString(),
            TabId: ctx.tabId.toString(),
            ContentBlockId: ctx.contentBlockId.toString(),
            RequestVerificationToken: ctx.antiForgeryToken,
            'X-Debugging-Hint': 'bootstrapped by Sxc4Angular',
          },
        });

        return next.handle(newReq);
      });
  }
}
