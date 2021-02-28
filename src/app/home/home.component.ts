import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../guards/auth.service';

/*SideMenu Model Interface*/
export interface SideMenuData {
  position: number;
  itemclass: string;
  title: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sidenavWidth = 5.5;
  ngStyle: string;
  private onDestroy$: Subject<void> = new Subject<void>();
  /*Source for SideMenu*/
  menuSource: SideMenuData[] = [
    { position: 1, itemclass: 'is_dashboard', title: 'DashBoard', icon: 'dashboard', routerLink: 'dashboard' },
    { position: 2, itemclass: 'is_calender', title: 'Calendar', icon: 'date_range', routerLink: 'calendar' },
    { position: 3, itemclass: 'is_users', title: 'Users', icon: 'supervised_user_circle', routerLink: 'users' },
    { position: 4, itemclass: 'is_integrations', title: 'Profile', icon: 'account_circle', routerLink: 'profile' },
    { position: 5, itemclass: 'is_settings', title: 'Settings', icon: 'settings', routerLink: 'settings' }
  ];

  constructor(private router: Router, private auth: AuthService) { }

  /*Side Menu Animation Width Settings*/
  increase() {
    this.sidenavWidth = 12;
  }
  decrease() {
    this.sidenavWidth = 5.5;
  }
  /*LogOut Method*/
  logout() {
    this.auth.logout().pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {

      if (data.code === 200) {
        this.auth.deleteSessionAndcookies();
        this.router.navigate(['../login']);
      }

    }, error => {
      this.auth.deleteSessionAndcookies();
      this.router.navigate(['../login']);
    });
    //
  }
  ngOnInit() {

  }
  // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }

}
