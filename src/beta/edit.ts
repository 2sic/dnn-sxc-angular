import { Context } from '../context/context.service';
import {
    Component,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { SxcInstanceWithEditing } from '@2sic.com/2sxc-typings';

@Directive({
  selector: 'sxc-toolbar'
})
export class SxcToolbarDirective implements OnInit {
  @Input() entityId: number;
  @Input() toolbar: any = {};
  @Input() settings: any = {};
  constructor(private elementRef: ElementRef, private context: Context) {}

  ngOnInit() {
    this.context.sxc$.subscribe(sxcSimple => {
      const sxc = sxcSimple as SxcInstanceWithEditing;
      if (!sxc.manage) return; // edit not available, probably not logged in
      this.setHtml(sxc.manage.getToolbar(this.toolbar, this.settings));
    });
  }

  setHtml(html: string) {
    this.elementRef.nativeElement.innerHTML = html;
  }
}
