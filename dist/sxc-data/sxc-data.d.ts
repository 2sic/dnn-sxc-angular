import { HttpClient } from '@angular/common/http';
import { ContentResource } from './sxc-content-resource';
export declare class SxcData {
    private http;
    constructor(http: HttpClient);
    content<T>(typeName: string): ContentResource<T>;
    query<T>(): void;
}
