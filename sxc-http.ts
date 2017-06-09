import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Request, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Subject } from "rxjs/Subject";
import { SxcAngular } from "./sxc-angular.service";
import { AppContext } from "./app-context";
@Injectable()
export class SxcHttp extends Http {
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private sxcNg: SxcAngular
  ) {
    super(backend, defaultOptions);
  }

  request(urlOrRequest: string | Request, options: RequestOptionsArgs = new RequestOptions()): Observable<Response> {
    let subject = new Subject<Response>();
    this.sxcNg.context.take(1)
      .subscribe(res => {
        if (typeof urlOrRequest === 'string') {
          urlOrRequest = res.sxc.resolveServiceUrl(<string>urlOrRequest);
          this.configure(options, res);
        } else {
          urlOrRequest.url = res.sxc.resolveServiceUrl(<string>urlOrRequest.url);
          this.configure(<Request>urlOrRequest, res);
        }

        super.request(urlOrRequest)
          .subscribe(res => subject.next(res));
      });

    return subject.asObservable();
  }

  private configure(options: RequestOptionsArgs | Request, params: AppContext): RequestOptionsArgs {
    if (!options.headers) options.headers = new Headers();
    options.headers.append('ModuleId', params.moduleId.toString());
    options.headers.append('TabId', params.tabId.toString());
    options.headers.append('ContentBlockId', params.contentBlockId.toString());
    options.headers.append('RequestVerificationToken', params.antiForgeryToken);
    options.headers.append('X-Debugging-Hint', 'bootstrapped by Sxc4Angular');
    return options;
  }
}