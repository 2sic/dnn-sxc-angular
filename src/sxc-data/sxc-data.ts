import { Http } from '@angular/http';
import { ContentResource } from './sxc-content-resource';

export class SxcData {
  constructor(
    private http: Http,
  ) { }

  content<T>(typeName: string): ContentResource<T> {
    return new ContentResource<T>(this.http, typeName);
  }

  query<T>() {
    throw 'Qery not implemented yet.';
  }
}