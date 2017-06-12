import { SxcHttp } from './sxc-http';
import { Http, XHRBackend, RequestOptions } from "@angular/http";
import { SxcAngular, DnnAngular } from "./sxc-angular.service";

export function DnnHttpProviderFactory(backend: XHRBackend, defaultOptions: RequestOptions, sxc: SxcAngular) {
    return new SxcHttp(backend, defaultOptions, sxc);
}

export let SxcHttpProvider = {
    provide: Http,
    useFactory: DnnHttpProviderFactory,
    deps: [XHRBackend, RequestOptions, SxcAngular]
};

export let DnnHttpProvider = {
    provide: Http,
    useFactory: DnnHttpProviderFactory,
    deps: [XHRBackend, RequestOptions, DnnAngular]
};