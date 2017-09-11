import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Context } from "../context/context.service";
export declare class Interceptor implements HttpInterceptor {
    private context;
    constructor(context: Context);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
