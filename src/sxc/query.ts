import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

export class Query<T> {
  constructor(
    private http: HttpClient,
    private name: string
  ) { }

  /**
   * will retrieve a 2sxc query
   * remember to set the permissions on the query, so it can be accessed by the group you want
   */
  get(params?: HttpParams): Observable<T> {
    let url = `app/auto/query/${this.name}`;
    return this.http.get<T>(url, { params });
  }
}
