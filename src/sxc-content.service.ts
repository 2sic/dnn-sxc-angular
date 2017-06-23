import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class ContentResourceFactory {
  constructor(
    private http: Http
  ) { }

  resource<T>(typeName: string) {
    return new ContentResource<T>(this.http, typeName);
  }
}

@Injectable()
export class ContentResource<T> {
  constructor(
    private http: Http,
    private typeName: string
  ) { }

  get(id: number = null): Observable<T> {
    let url = `app/auto/content/${this.typeName}`;
    if (id) url += `/${id}`;
    let headers = new Headers();
    return this.http.get(url, { headers })
      .map(response => <T>response.json());
  }
}