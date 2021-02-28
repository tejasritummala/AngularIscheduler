import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  map} from 'rxjs/operators';
import { ForgotPassword} from './forgot-password.model';
@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private baseURL = environment.apiUrl;
  profileName: string;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /*Forgot Service*/
  forgot(userObj): Observable <any> {
    const url = this.baseURL + '1/forgotpassword';
    return this.http.post(url, userObj)
      .pipe(map((response: any) => {
        console.log(response);
        return response;
      }));
  }
}
