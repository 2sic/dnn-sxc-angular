import { HttpClient } from '@angular/common/http';
import { Content } from './content';
import { Query } from "./query";

export class SxcData {
  constructor(
    private http: HttpClient,
  ) { }

  content<T>(contentType: string): Content<T> {
    return new Content<T>(this.http, contentType);
  }

  query<T>(name: string) {
    return new Query<T>(this.http, name);
  }
}
