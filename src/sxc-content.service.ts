import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class ContentResourceFactory {
  constructor(private http: Http) { }

  resource(typeName: string) {
    return new ContentResource(this.http, typeName);
  }
}

@Injectable()
export class ContentResource {
  constructor(
    private http: Http,
    private typeName: string
  ) { }

  get(id: number = null): Observable<Response> {
    let url = `app/auto/content/${this.typeName}`;
    if (id) url += `/${id}`;
    let headers = new Headers();
    return this.http.get(url, { headers });
  }
}