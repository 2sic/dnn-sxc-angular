import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
export declare class Content<T> {
    private http;
    private contentType;
    constructor(http: HttpClient, contentType: string);
    get(id?: number): Observable<T[]>;
}
