import { HttpHandler } from '@angular/common/http';
import { SxcHttpClient } from './sxc-http';
import { Provider } from '@angular/core';
import { Context } from '.';
export declare const HttpProvider: Provider;
export declare function HttpProviderFactory(handler: HttpHandler, sxc: Context): SxcHttpClient;
