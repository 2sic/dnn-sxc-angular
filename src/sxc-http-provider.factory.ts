import {SxcHttp} from './sxc-http';
import {SxcAngular} from './sxc-angular.service';
import {RequestOptions} from '@angular/http';
import { XHRBackend } from "@angular/http/src";

export function SxcHttpProviderFactory(backend: XHRBackend, defaultOptions: RequestOptions, sxc: SxcAngular) {
    return new SxcHttp(backend, defaultOptions, sxc);
}