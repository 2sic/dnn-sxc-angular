import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
export declare class Query<T> {
    private http;
    private name;
    constructor(http: HttpClient, name: string);
    get(): Observable<T[]>;
}
