import { Http } from '@angular/http';
import { HttpEvent, HttpParams, HttpHeaders, HttpHandler, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpRequest } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';
import { Subject } from 'rxjs/Subject';
import { ContextInfo } from "../context/context-info";
import { Context } from "../context/context.service";

// todo: review if we should change the concept to an interceptor instead of an inject

@Injectable()
export class DnnHttpClient extends HttpClient {
  constructor(
    handler: HttpHandler,
    private context: Context
  ) {
    super(handler);
  }

  /**
   * Perform a HTTP Request
   * @param first request
   * @param url request url
   * @param options request options
   */
  request(first: string | HttpRequest<any>, url?: string, options: {
    body?: any,
    headers?: HttpHeaders,
    observe?: HttpObserve,
    params?: HttpParams,
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    const result = new Subject<HttpEvent<any>>();

    console.log('request test', arguments);

    // Subscribe to the context.
    this.context.complete.take(1)
      .subscribe(appContext => {
        let req: HttpRequest<any>;

        // Firstly, check whether the primary argument is an instance of `HttpRequest`.
        if (first instanceof HttpRequest) {
          req = first as HttpRequest<any>;

          // Clone the request and update the url with 2sxc params.
          req = req.clone({
            url: appContext.sxc.resolveServiceUrl(req.url),
          });
        } else {
          // url = url || appContext.sxc.resolveServiceUrl(<string>first)
          // urlOrRequest = res.sxc.resolveServiceUrl(<string>first);

          first = appContext.sxc.resolveServiceUrl(<string>first);
          console.log(first, url);

          // It's a string, so it represents a URL.
          req = new HttpRequest(first, url !, options.body || null, {
            headers: options.headers,
            params: options.params,
            reportProgress: options.reportProgress,

            // By default, JSON is assumed to be returned for all calls.
            responseType: options.responseType, // 2017-09-09 2dm, this is the default on HttpClient // || 'json',
            withCredentials: options.withCredentials,
          });
        }
        this.appendHeaders(options, appContext);

        super.request(req)
          .subscribe(res => result.next(res));
      });

    return result.asObservable();
  }

  /**
   * Add 2sxc headers to the request.
   * @param options request options
   * @param appContext 2sxc appContext
   */
  private appendHeaders(options: any, appContext: ContextInfo): any {
    if (!options.headers) {
      options.headers = new HttpHeaders();
    }
    options.headers.append('ModuleId', appContext.moduleId.toString());
    options.headers.append('TabId', appContext.tabId.toString());
    options.headers.append('ContentBlockId', appContext.contentBlockId.toString());
    options.headers.append('RequestVerificationToken', appContext.antiForgeryToken);
    options.headers.append('X-Debugging-Hint', 'bootstrapped by Sxc4Angular');
    return options;
  }
}