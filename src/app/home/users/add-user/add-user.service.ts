import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();
  private baseURL = environment.apiUrl;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient , private cookieService: CookieService) { }
  /*addUser Service*/
  addUser(userObj): Observable<any> {
    const url = this.baseURL + '1/user';
    const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
    this.headers = this.headers.set('session_id', seesionId);
    return this.http.post(url, userObj, { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  updateUser(userData , userId): Observable<any> {
    const url = this.baseURL + '1/user/' + userId;
    const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
    this.headers = this.headers.set('session_id', seesionId);
    return this.http.post(url, userData , { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }
  changeMessage(message) {
    this.messageSource.next(message);
  }
}
