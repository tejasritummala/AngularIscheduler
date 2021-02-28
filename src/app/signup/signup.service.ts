import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseURL = environment.apiUrl;

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /*SignUp Service*/
  signup(userObj): Observable <any> {
    const url = this.baseURL + '1/signup';
    return this.http.post(url, userObj)
      .pipe(map((response: any) => {
        return response;
      }));
  }
  /*Get Countries Service*/
  countries(): Observable <any> {
    const url = this.baseURL + '1/lookup?type=country';
    return this.http.get(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
