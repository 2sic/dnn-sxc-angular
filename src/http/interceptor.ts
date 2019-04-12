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
        var url = req.url;
        if(ctx.sxc)
          url = ctx.sxc.resolveServiceUrl(req.url);
        else if(!["//", "http://", "https://", "/"].find((s) => url.toLowerCase().startsWith(s)))
          url = ctx.path + url;
        
        if(ctx.appNameInPath)
          url = url.replace('/app/auto/', `/app/${ctx.appNameInPath}/`);

        // Clone the request and update the url with 2sxc params.
        const newReq = req.clone({
          url: url,
          setHeaders: ctx.addDnnHeaders ? {
            ModuleId: ctx.moduleId.toString(),
            TabId: ctx.tabId.toString(),
            ContentBlockId: ctx.contentBlockId.toString(),
            RequestVerificationToken: ctx.antiForgeryToken ? ctx.antiForgeryToken : ""
          } : {},
        });

        return next.handle(newReq);
      }));
  }
}
