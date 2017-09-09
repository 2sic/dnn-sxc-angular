import { HttpParams, HttpHeaders, HttpHandler, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Context } from '..';
import { HttpRequest } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';
export declare class SxcHttpClient extends HttpClient {
    private sxcNg;
    constructor(handler: HttpHandler, sxcNg: Context);
    /**
     * Perform a HTTP Request
     * @param first request
     * @param url request url
     * @param options request options
     */
    request(first: string | HttpRequest<any>, url?: string, options?: {
        body?: any;
        headers?: HttpHeaders;
        observe?: HttpObserve;
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
    }): Observable<any>;
    /**
     * Add 2sxc headers to the request.
     * @param options request options
     * @param appContext 2sxc appContext
     */
    private appendHeaders(options, appContext);
}
