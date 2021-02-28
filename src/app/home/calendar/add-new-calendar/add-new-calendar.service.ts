import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AddNewCalendarService {
  private baseURL = environment.apiUrl;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /*addUser Service*/
  createCalendar(calObj): Observable<any> {
    const url = this.baseURL + '1/createcalendar';
    const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
    this.headers = this.headers.set('session_id', seesionId);
    return this.http.post(url, calObj, { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

}
