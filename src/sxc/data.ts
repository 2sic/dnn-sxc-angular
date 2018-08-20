import { Api } from './api';
import { Content } from './content';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from './query';

/**
 * 2sxc data provider
 * gives you access to content and query streams using the content$ and query$ commands
 * you can also use the content and query managers, but these are currently not so useful
 */
@Injectable()
export class Data {
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * get a content manager object
   * usually you will prefer the the observable stream content$
   * this manager is currently included for consistency, and will later also offer write commands
   * @param contentType name of the content-type
   */
  public content<T>(contentType: string): Content<T> {
    return new Content<T>(this.http, contentType);
  }

  /**
   * get a stream of content items or (if ID is provided) a stream containing one item
   * @param contentType name of the content-type
   * @param id optional id of a single item
   */
  content$<T>(contentType: string): Observable<T[]>;
  content$<T>(contentType: string, id: number): Observable<T>
  content$<T>(contentType: string, id: number = null): Observable<T[]> | Observable<T> {
    return new Content<T>(this.http, contentType).get(id);
  }

  /**
   * get a query object to then start queries
   * usually you'll be better off using the observable stream query$, this is included primarily for consistency in the api
   * @param name the query name
   * @returns a query object with a .get()
   */
  public query<T>(name: string) {
    return new Query<T>(this.http, name);
  }

  /**
   * retrieve a query stream from the server
   * @param name the query name
   * @param params optional parameters-object
   * @returns a typed observable which will give you the query
   */
  public query$<T>(name: string, params?: HttpParams): Observable<T> {
    return new Query<T>(this.http, name).get(params);
  }


  
  /**
   * get an api object to then start api-calls
   * usually you'll be better off using the observable stream api$, this is included primarily for consistency in the api
   * @param controller the api controller
   * @returns a query object with a .get()
   */
  public api<T>(controller: string): Api<T> {
    return new Api<T>(this.http, controller);
  }

  /**
   * retrieve a api stream from the server
   * @param name the method name
   * @param params optional parameters-object
   * @returns a typed observable which will give you the query
   */
  public api$<T>(name: string, params?: HttpParams): Observable<T> {
    return new Api<T>(this.http, name).get(name, params);
  }
  
}
