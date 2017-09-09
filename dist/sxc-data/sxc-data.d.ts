import { HttpClient } from '@angular/common/http';
import { Content } from './content';
import { Query } from "./query";
export declare class SxcData {
    private http;
    constructor(http: HttpClient);
    content<T>(contentType: string): Content<T>;
    query<T>(name: string): Query<T>;
}
