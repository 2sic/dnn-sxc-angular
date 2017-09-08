import { HttpClient } from '@angular/common/http';
import { ContentResource } from './sxc-content-resource';

export class SxcData {
  constructor(
    private http: HttpClient,
  ) { }

  content<T>(typeName: string): ContentResource<T> {
    return new ContentResource<T>(this.http, typeName);
  }

  query<T>() {
    throw new Error('Qery not implemented yet.');
  }
}
