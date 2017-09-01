import { SxcHttpProviderFactory } from './sxc-http-provider.factory';
import { SxcHttp } from './sxc-http';
import { Http, XHRBackend, RequestOptions } from "@angular/http";
import { SxcAngular, DnnAngular } from "./sxc-angular.service";
import { Provider } from "@angular/core";

export const SxcHttpProvider: Provider = {
    provide: Http,
    useFactory: SxcHttpProviderFactory,
    deps: [XHRBackend, RequestOptions, SxcAngular]
};

// export const DnnHttpProvider: Provider = {
//     provide: Http,
//     useFactory: SxcHttpProviderFactory,
//     deps: [XHRBackend, RequestOptions, DnnAngular]
// };