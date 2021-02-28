import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImportUserService {
  private baseURL = environment.apiUrl;
  headers = new HttpHeaders({});
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /*addUser Service*/
  importUserFile(file): Observable<any> {
    const url = this.baseURL + '1/uploads';
    const seesionId = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
    this.headers = this.headers.set('session_id', seesionId);
    return this.http.post(url, file, { headers: this.headers })
    .pipe(map((response: any) => {
      return response;
    }));
  }
  importUserFileName(uploadedfileObj): Observable<any> {
   const fileObj = {file_name : uploadedfileObj.file_url};
   this.headers = new HttpHeaders({});
   const seesionId1 = this.cookieService.get(environment.sessionCookieName + environment.cookieSuffix);
   const uploadurl = this.baseURL + '1/userimport';
   this.headers = this.headers.set('session_id', seesionId1);
   return this.http.post(uploadurl, fileObj, { headers: this.headers })
     .pipe(map((response: any) => {
       return response;
     }));
 }

}
