import { HttpClient } from '@angular/common/http';
import { SxcData } from '@2sic.com/dnn-sxc-angular/src/sxc-data/sxc-data';
import { Provider } from '@angular/core';

export const SxcDataProvider: Provider = {
    provide: SxcData,
    useFactory: SxcDataProviderFactory,
    deps: [HttpClient]
};

export function SxcDataProviderFactory(http: HttpClient) {
    return new SxcData(http);
}
