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
export class CalendarViewService {
  private calendarSource = new BehaviorSubject({});
  currentCal = this.calendarSource.asObservable();
  private baseURL = environment.apiUrl;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /*addUser Service*/
  getCalendars(): Observable<any> {
    const url = this.baseURL + '1/calendarlist';
    const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
    this.headers = this.headers.set('session_id', seesionId);
    return this.http.get(url, { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }
  setdefaultCalendar(calendarObj): Observable<any> {
    const url = this.baseURL + '1/setdefaultcalendar';
    const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
    this.headers = this.headers.set('session_id', seesionId);
    return this.http.post(url,  {calendar_id : calendarObj.calendar_id} ,  { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  changeCal(cal) {
    this.calendarSource.next(cal);
  }
}
