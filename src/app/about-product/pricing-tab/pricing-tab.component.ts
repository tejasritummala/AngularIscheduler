import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
declare var $: any;
@Component({
  selector: 'app-pricing-tab',
  templateUrl: './pricing-tab.component.html',
  styleUrls: ['./pricing-tab.component.css']
})
export class PricingTabComponent implements OnInit {
  message: string;
  mobileQuery: MediaQueryList;
  id;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(min-width: 640px)');
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  onBtnClick(evt) {
    if (evt.target.textContent === 'Team') {
      this.id = 4;
    } else if (evt.target.textContent === 'Personal') {
      this.id = 2;
    } else {
      this.id = 3;
    }
    $('tr').find('td:not(:eq(0))').hide();
    $('td:nth-child(' + this.id + ')').css('display', 'table-cell');
    $('tr').find('th:not(:eq(0))').hide();
  }

  mobileQueryListener(mobileQuery) {
    if (mobileQuery.matches) {
      $('.sep').attr('colspan', 5);
    } else {
      if (document.getElementsByClassName('bg-blue')[1].className.includes('active')) {
        $('td:nth-child(3)').css('display', 'table-cell');
      }
    }
  }

  ngOnInit() {
    this.id = 3;
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
  sendMessage(evt) {
    if (evt.target.text.includes('Product')) {
      this.messageEvent.emit('Product');
    } else {
      this.messageEvent.emit(evt.target.text);
    }

  }
}
