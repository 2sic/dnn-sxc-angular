import { SxcHttp } from './sxc-http';
import { SxcAngular } from './sxc-angular.service';
import { RequestOptions } from '@angular/http';
import { XHRBackend } from "@angular/http/src";
export declare function SxcHttpProviderFactory(backend: XHRBackend, defaultOptions: RequestOptions, sxc: SxcAngular): SxcHttp;
