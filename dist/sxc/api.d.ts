import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
export declare class Api<T> {
    private http;
    private controller;
    constructor(http: HttpClient, controller: string);
    /**
     * will retrieve a 2sxc query
     * remember to set the permissions on the query, so it can be accessed by the group you want
     */
    get(method: string, params?: HttpParams): Observable<T>;
}
