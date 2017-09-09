import { HttpParams, HttpHeaders, HttpHandler, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { HttpRequest } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';
import { Context } from "../context/context.service";
export declare class DnnHttpClient extends HttpClient {
    private context;
    constructor(handler: HttpHandler, context: Context);
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
