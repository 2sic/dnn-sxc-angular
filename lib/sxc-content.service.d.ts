import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
export declare class ContentResourceFactory {
    private http;
    constructor(http: Http);
    resource(typeName: string): ContentResource;
}
export declare class ContentResource {
    private http;
    private typeName;
    constructor(http: Http, typeName: string);
    get(id?: number): Observable<Response>;
}
