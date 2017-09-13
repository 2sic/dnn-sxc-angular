import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Content<T> {
  constructor(
    private http: HttpClient,
    private contentType: string,
  ) { }

  get(): Observable<T[]>;
  get(id: number): Observable<T>
  get(id: number = null): Observable<T[]> | Observable<T> {
    let url = `app/auto/content/${this.contentType}`;
    if (id) {
      url += `/${id}`;
      return this.http.get<T>(url);
    }

    return this.http.get<T[]>(url);
  }

  post(id: number, data: any): Observable<T> {
    throw new Error('not implemented yet');
  }
}
