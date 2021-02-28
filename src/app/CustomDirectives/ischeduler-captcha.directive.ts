import { Directive, ElementRef, HostListener, Input, OnInit, Renderer, Output, EventEmitter  } from '@angular/core';
@Directive({
  selector: '[appIschedulerCaptcha]'
})
export class IschedulerCaptchaDirective {
  recaptchaElement;
  @Input() IschedulerCaptcha: string;
  @Output() messageEvent = new EventEmitter<any>();

  constructor(private el: ElementRef) {
    this.recaptchaElement = el;
    this.addRecaptchaScript();
  }
  renderReCaptch() {

    grecaptcha.render(this.recaptchaElement.nativeElement, {
      sitekey: '6LcRDcQUAAAAAAfeKYr-KsiZSDemGu7f5o4d2mrr',
      callback: (response) => {
        this.messageEvent.emit({type: 'success', token: response});
      },
      'expired-callback':  () => {
        this.messageEvent.emit({type: 'expired', token: ''});
      },
    });

  }
  addRecaptchaScript() {
    // tslint:disable-next-line: no-string-literal
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    };
    // tslint:disable-next-line: only-arrow-functions
    (function(d, s, id, obj) {
      /* tslint:disable:one-variable-per-declaration */
      // tslint:disable-next-line: prefer-const
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));

  }

}
