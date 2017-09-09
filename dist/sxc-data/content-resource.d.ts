import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
export declare class ContentResource<T> {
    private http;
    private typeName;
    constructor(http: HttpClient, typeName: string);
    get(id?: number): Observable<T[]>;
}
