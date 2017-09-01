import { Http, XHRBackend, RequestOptions } from "@angular/http";
import { Provider } from "@angular/core";
import { SxcData } from '@2sic.com/dnn-sxc-angular/src/sxc-data/sxc-data';

export const SxcDataProvider: Provider = {
    provide: SxcData,
    useFactory: SxcDataProviderFactory,
    deps: [XHRBackend]
};

export function SxcDataProviderFactory(http: Http) {
    return new SxcData(http);
}