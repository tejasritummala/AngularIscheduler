import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseURL = environment.apiUrl;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  /*Login Service*/
  login(userObj): Observable<any> {
    const url = this.baseURL + '1/signin';
    return this.http.post(url, userObj)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
