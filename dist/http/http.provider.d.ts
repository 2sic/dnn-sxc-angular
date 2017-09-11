import { HttpHandler } from '@angular/common/http';
import { Provider } from '@angular/core';
import { Context } from '..';
import { DnnHttpClient } from './sxc-http-client';
export declare const HttpProvider: Provider;
export declare function HttpProviderFactory(handler: HttpHandler, sxc: Context): DnnHttpClient;
