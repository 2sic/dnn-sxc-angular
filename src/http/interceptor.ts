import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { Context } from "../context/context.service";
import { take, mergeMap } from 'rxjs/operators';
import { appRouteAuto, apiRouteAuto, apiRouteName } from '../contants';

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

        // change to use api of an edition, if an edition was specified
        // but only do this on api-routes, the others don't support editions
        if(ctx.apiEdition)
          url = url.replace(apiRouteAuto, appRouteAuto + ctx.apiEdition + '/' + apiRouteName + '/');
        
        if(ctx.appNameInPath)
          url = url.replace(appRouteAuto, `app/${ctx.appNameInPath}/`);

        // Clone the request and update the url with 2sxc params.
        const newReq = req.clone({
          url: url,
          withCredentials: ctx.withCredentials,
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
