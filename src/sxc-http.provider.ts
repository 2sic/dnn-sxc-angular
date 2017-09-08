import { HttpClient, HttpHandler } from '@angular/common/http';
import { RequestOptions, Http, XHRBackend } from '@angular/http';
import { SxcHttp } from './sxc-http';
import { Provider } from '@angular/core';
import { SxcAngular } from '@2sic.com/dnn-sxc-angular';

export const SxcHttpProvider: Provider = {
    provide: HttpClient,
    useFactory: SxcHttpProviderFactory,
    deps: [HttpHandler, SxcAngular]
};

export function SxcHttpProviderFactory(handler: HttpHandler, sxc: SxcAngular) {
    return new SxcHttp(handler, sxc);
}

// export const DnnHttpProvider: Provider = {
//     provide: Http,
//     useFactory: SxcHttpProviderFactory,
//     deps: [XHRBackend, RequestOptions, DnnAngular]
// };
