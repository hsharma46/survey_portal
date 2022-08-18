import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstant } from '../shared/app.constant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private headers: any = {};
  constructor(private http: HttpClient) {
    const headerObj = {
      'Content-Type': 'application/json'
    };
    this.headers = new HttpHeaders(headerObj);
  }

  onLogin(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}user/login`, { params });
  }
}
