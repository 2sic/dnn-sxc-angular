import { SxcController } from '@2sic.com/2sxc-typings';
import { ElementRef, Injectable, Optional } from '@angular/core';
import { SxcInstance } from '../interfaces/sxc-instance';
import { appTag } from '../names';
import { ContextInfo } from './context-info';

export class AppTagService {
    constructor(
        private el: ElementRef
    ) {
    }
    
    public getTag(attribute: string) {
        // todo: after upgrading to NG8, probably use el.GetAttribute
        return this.el.nativeElement.getAttribute(attribute);
    }
}
