import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
export declare class Content<T> {
    private http;
    private contentType;
    constructor(http: HttpClient, contentType: string);
    get(): Observable<T[]>;
    get(id: number): Observable<T>;
    post(id: number, data: any): Observable<T>;
}
