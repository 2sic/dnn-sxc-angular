import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

export class Api<T> {
  constructor(
    private http: HttpClient,
    private controller: string
  ) { 
    console.warn("important: 2sxc-data.api isn't fully tested yet.");    
  }

  /**
   * will retrieve a 2sxc query
   * remember to set the permissions on the query, so it can be accessed by the group you want
   */
  get(method: string, params?: HttpParams): Observable<T> {
    let url = `app/auto/api/${this.controller}/${method}`;
    return this.http.get<T>(url, { params });
  }
}
