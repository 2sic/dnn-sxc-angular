import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Query<T> {
  constructor(
    private http: HttpClient,
    private name: string
  ) { }

  get(): Observable<T> {
    let url = `app/auto/query/${this.name}`;
    return this.http.get<T>(url);
  }
}
