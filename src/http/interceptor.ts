import { ContextInfo } from '../context/context-info';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { Context } from "../context/context.service";
import { HttpHeaders } from '@angular/common/http';
import { take, mergeMap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private context: Context
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.context.all$.pipe(take(1))
      .pipe(mergeMap(ctx => {

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
      }));
  }
}
