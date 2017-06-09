import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SxcAngular } from "./sxc-angular.service";
export declare class SxcHttp extends Http {
    private sxcNg;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, sxcNg: SxcAngular);
    request(urlOrRequest: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    private configure(options, params);
}
