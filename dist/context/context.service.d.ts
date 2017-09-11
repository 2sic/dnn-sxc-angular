import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/timer';
import 'rxjs/Rx';
import { SxcInstance } from "../interfaces/sxc-instance";
import { DevContext as DevContext } from "./dev-context";
import { ContextInfo } from "./context-info";
export declare class Context {
    private devSettings;
    private globSxc;
    private midSubject;
    private tidSubject;
    private cbIdSubject;
    private afTokenSubject;
    private sxcSubject;
    private sxcInstance;
    private contextSubject;
    all: Observable<ContextInfo>;
    moduleId: Observable<number>;
    tabId: Observable<number>;
    contentBlockId: Observable<number>;
    antiForgeryToken: Observable<string>;
    sxc: Observable<SxcInstance>;
    constructor(devSettings: DevContext);
    /**
     * Configure 2sxc in the context of a HTMLNode.
     * @param htmlNode the HTMLNode
     */
    autoConfigure(htmlNode: ElementRef): void;
}
