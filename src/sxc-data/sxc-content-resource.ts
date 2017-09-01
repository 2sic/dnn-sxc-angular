import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

export class ContentResource<T> {
  constructor(
    private http: Http,
    private typeName: string
  ) { }

  get(id: number = null): Observable<T[]> {
    let url = `app/auto/content/${this.typeName}`;
    if (id) {
      url += `/${id}`;
    }
    const headers = new Headers();
    return this.http.get(url, { headers })
      .map(response => <T[]>response.json());
  }
}