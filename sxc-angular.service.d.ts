import { ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { AppContext } from "./app-context";
import { SxcInstance } from "./sxc-instance";
import { DnnDevSettings } from "./dev/dnn-dev-settings";
export declare class SxcAngular {
    private devSettings;
    context: Observable<AppContext>;
    moduleId: Observable<number>;
    tabId: Observable<number>;
    contentBlockId: Observable<number>;
    antiForgeryToken: Observable<string>;
    sxc: Observable<SxcInstance>;
    private globSxc;
    private midSubject;
    private tidSubject;
    private cbIdSubject;
    private afTokenSubject;
    private contextSubject;
    private sxcSubject;
    private sxcInstance;
    constructor(devSettings: DnnDevSettings);
    autoConfigure(htmlNode: ElementRef): void;
}
export declare class DnnAngular extends SxcAngular {
}
