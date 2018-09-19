import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Api<T> {
  constructor(
    private http: HttpClient,
    private controller: string
  ) { 
    console.warn("important: 2sxc-data.api isn't fully tested yet.");    
  }

  /**
   * will call a 2sxc api controller method
   */
  get(method: string, params?: HttpParams): Observable<T> {
    let url = `app/auto/api/${this.controller}/${method}`;
    return this.http.get<T>(url, { params });
  }

  /**
   * will post to a 2sxc api controller method
   */
  post(method: string, body: any, params?: HttpParams): Observable<T> {
    let url = `app/auto/api/${this.controller}/${method}`;
    return this.http.post<T>(url, body, { params });
  }
}
