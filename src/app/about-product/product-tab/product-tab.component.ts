import { Component, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../../about-product/window.service';
@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.css']
})
export class ProductTabComponent implements OnInit {
  message: string;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) private window) { }
  visible;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // tslint:disable-next-line: variable-name
    const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number >= 630) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }
  ngOnInit() {
  }
  sendMessage(evt) {
    if (evt.target.text.includes('Product')) {
      this.messageEvent.emit('Product');
    } else {
      this.messageEvent.emit(evt.target.text);
    }
  }
}
