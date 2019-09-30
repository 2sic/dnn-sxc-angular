import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiRouteAuto } from '../contants';

export class Api {
  constructor(
    private http: HttpClient,
    private controller: string
  ) { 
  }

  /**
   * GET call a 2sxc api controller method
   */
  get<T>(method: string, params?: HttpParams): Observable<T> {
    let url = `${apiRouteAuto}${this.controller}/${method}`;
    return this.http.get<T>(url, { params }); //.pipe(map(result => result.data))
  }

  /**
   * POST to a 2sxc api controller method
   */
  post<T>(method: string, body: any, params?: HttpParams): Observable<T> {
    let url = `${apiRouteAuto}${this.controller}/${method}`;
    return this.http.post<T>(url, body, { params });
  }
}
