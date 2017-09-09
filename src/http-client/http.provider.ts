import { HttpClient, HttpHandler } from '@angular/common/http';
import { RequestOptions, Http, XHRBackend } from '@angular/http';
import { Provider } from '@angular/core';
import { Context } from '..';
import { SxcHttpClient } from "./sxc-http-client";

export const HttpProvider: Provider = {
    provide: HttpClient,
    useFactory: HttpProviderFactory,
    deps: [HttpHandler, Context]
};

export function HttpProviderFactory(handler: HttpHandler, sxc: Context) {
    return new SxcHttpClient(handler, sxc);
}

