import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/timer';
import 'rxjs/Rx';
import { SxcInstance } from "../interfaces/sxc-instance";
import { Dev } from "./dev-context";
import { ContextInfo } from "./context-info";
export declare class Context {
    private devSettings;
    complete: Observable<ContextInfo>;
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
    constructor(devSettings: Dev);
    /**
     * Configure 2sxc in the context of a HTMLNode.
     * @param htmlNode the HTMLNode
     */
    autoConfigure(htmlNode: ElementRef): void;
}
