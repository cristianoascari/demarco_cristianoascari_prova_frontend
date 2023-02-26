// Angular.
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appInputFocus]' })
export class InputFocusDirective {
  constructor(private el: ElementRef) { }

  // Input field focus event.
  @HostListener('focus') onFocus() {
    window.setTimeout(() => { this.el.nativeElement.focus(); });
  }

  // Input field blur event.
  @HostListener('blur') onBlur() {
    // TO DO
  }
}
