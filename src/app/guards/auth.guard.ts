import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../guards/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService,  private auth: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.auth.validateUserSession()) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;

  }

}


}
