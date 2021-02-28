import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.css']
})
export class AboutProductComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  selectedValue: string = 'Product';
  constructor(private router: Router) { }
  ngOnInit() {
  }
  /*clicked tab event */
  tabClickEvent(tabname) {
    if (tabname === 'Log In') {
      this.router.navigateByUrl('/login');
    } else if (tabname === 'Get Started') {
      this.router.navigateByUrl('/register');
    } else {
      this.selectedValue = tabname;
    }
  }

}
