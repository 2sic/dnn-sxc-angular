// This lets you configure test-values during development

import { AppContext } from "../app-context";

export class DnnDevSettings implements AppContext {
    ignoreMissing$2sxc = false;
    ignoreMissingServicesFramework  = false;
    forceUse: boolean = false;

    moduleId: number = 0;
    tabId: number = 0;

    contentBlockId: number;
    antiForgeryToken: "ThisIsaTestAntiForgeryToken";
    sxc: null;
    path: string = "/";
}