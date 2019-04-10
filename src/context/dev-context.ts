// This lets you configure test-values during development.

import { ContextInfo } from './context-info';
import { Injectable } from '@angular/core';

@Injectable()
export class DevContext implements ContextInfo {
    ignoreMissing$2sxc = false;
    ignoreMissingServicesFramework = false;
    disableHeaders = false;

    moduleId: number = 0;
    tabId: number = 0;

    contentBlockId: number;
    antiForgeryToken: 'ThisIsaTestAntiForgeryToken';
    sxc: any;
    path: string = '/';
    appNameInPath: string = ""
}
