import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  private baseURL = environment.apiUrl;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /*addUser Service*/
  getUsers(userObj): Observable<any> {
    const url = this.baseURL + '1/userlist';
    const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
    this.headers = this.headers.set('session_id', seesionId);
    return this.http.post(url, userObj, { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }
  deleteUsers(users): Observable<any> {
    const url = this.baseURL + '1/deleteuser';
    const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
    this.headers = this.headers.set('session_id', seesionId);
    return this.http.post(url, users, { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }
  sentInvitation(users): Observable<any> {
    const url = this.baseURL + '1/sendinvite';
    const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
    this.headers = this.headers.set('session_id', seesionId);
    return this.http.post(url, users, { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

}
