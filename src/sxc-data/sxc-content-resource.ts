import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class ContentResource<T> {
  constructor(
    private http: HttpClient,
    private typeName: string
  ) { }

  get(id: number = null): Observable<T[]> {
    let url = `app/auto/content/${this.typeName}`;
    if (id) {
      url += `/${id}`;
    }
    const headers = new HttpHeaders();
    return this.http.get<T[]>(url, { headers });
  }
}
