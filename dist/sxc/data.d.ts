import { HttpClient } from '@angular/common/http';
import { Content } from './content';
import { Query } from './query';
import { Observable } from "rxjs/Rx";
import { HttpParams } from "@angular/common/http";
import { Api } from "./api";
/**
 * 2sxc data provider
 * gives you access to content and query streams using the content$ and query$ commands
 * you can also use the content and query managers, but these are currently not so useful
 */
export declare class Data {
    private http;
    constructor(http: HttpClient);
    /**
     * get a content manager object
     * usually you will prefer the the observable stream content$
     * this manager is currently included for consistency, and will later also offer write commands
     * @param contentType name of the content-type
     */
    content<T>(contentType: string): Content<T>;
    /**
     * get a stream of content items or (if ID is provided) a stream containing one item
     * @param contentType name of the content-type
     * @param id optional id of a single item
     */
    content$<T>(contentType: string): Observable<T[]>;
    content$<T>(contentType: string, id: number): Observable<T>;
    /**
     * get a query object to then start queries
     * usually you'll be better off using the observable stream query$, this is included primarily for consistency in the api
     * @param name the query name
     * @returns a query object with a .get()
     */
    query<T>(name: string): Query<T>;
    /**
     * retrieve a query stream from the server
     * @param name the query name
     * @param params optional parameters-object
     * @returns a typed observable which will give you the query
     */
    query$<T>(name: string, params?: HttpParams): Observable<T>;
    /**
     * get an api object to then start api-calls
     * usually you'll be better off using the observable stream api$, this is included primarily for consistency in the api
     * @param controller the api controller
     * @returns a query object with a .get()
     */
    api<T>(controller: string): Api<T>;
    /**
     * retrieve a api stream from the server
     * @param name the method name
     * @param params optional parameters-object
     * @returns a typed observable which will give you the query
     */
    api$<T>(name: string, params?: HttpParams): Observable<T>;
}
