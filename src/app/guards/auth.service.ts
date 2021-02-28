import { Injectable } from '@angular/core';
import { Login, LoginSuccess } from '../login/login.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseURL = environment.apiUrl;
    headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    userData: LoginSuccess;
    tocken;
    constructor(private cookieService: CookieService, private http: HttpClient) {
    }
    setTokenAndUserDetails(loginsuccessData) {
        // Put the object into storage
        localStorage.setItem('loginSuccessObject', JSON.stringify(loginsuccessData));
        this.userData = JSON.parse(localStorage.getItem('loginSuccessObject'));
    }
    getTokenAndUserDetails() {
        const retrievedUserObject: LoginSuccess = JSON.parse(localStorage.getItem('loginSuccessObject'));
        this.userData = new LoginSuccess(retrievedUserObject);
        return this.userData;
    }
    setCookeService() {
        // tslint:disable-next-line: max-line-length
        this.cookieService.set(environment.sessionCookieName + environment.cookieSuffix, this.userData.sessionId, 7, '/', environment.cookieDomain);
    }
    validateUserSession() {
        const session = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
        if (session) {
            return true;
        } else {
            return false;
        }
    }
    deleteSessionAndcookies() {
        this.cookieService.delete(environment.sessionCookieName + environment.cookieSuffix);
        this.cookieService.deleteAll('/', environment.cookieDomain);
        // localStorage.clear();
        localStorage.removeItem('loginSuccessObject');
    }
    /*Logout Service */
    logout(): Observable<any> {
        const url = this.baseURL + '1/signout';
        const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
        this.headers = this.headers.set('session_id', seesionId);
        return this.http.post(url, '', { headers: this.headers })
            .pipe(map((response: Response) => {
                return response;
            }));

    }
}
