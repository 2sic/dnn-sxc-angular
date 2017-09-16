import { Directive, Input, Component, ElementRef, Renderer, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Context } from '../context/context.service'

import '@2sic.com/2sxc-typings';


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'sxc-toolbar'
})
export class SxcToolbarDirective implements OnInit {
    @Input() entityId: number;
    @Input() toolbar: any;
    @Input() settings: any;
    // toolbar: SafeHtml;
    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef,
        private context: Context) { }

    ngOnInit() {
        this.context.sxc$.subscribe(sxcSimple  => {
            const sxc = sxcSimple as SxcInstanceWithEditing;
            if (!sxc.manage) return;    // edit not available, probably not logged in
            this.setHtml(sxc.manage.getToolbar(this.toolbar, { hover: 'left' }));
        });

    }



    setHtml(html:string){
        this.elementRef.nativeElement.innerHTML = html;
    }
}