import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../shared/app.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabletService {

  private headers: any = {};
  constructor(private http: HttpClient) {
    const headerObj = {
      'Content-Type': 'application/json'
    };
    this.headers = new HttpHeaders(headerObj);
  }

  getTablet(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}tablet/getall`, { params });
  }

  getTabletById(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}tablet/getbyid/id`, { params });
  }

  createTablet(body = {}): Observable<any> {
    return this.http.post(`${AppConstant.API_URL}tablet/create`, body);
  }

  updateTablet(params: any, body = {}): Observable<any> {
    const id = params['id'];
    return this.http.put(`${AppConstant.API_URL}tablet/update/${id}`, body);
  }

  deleteTablet(params: any): Observable<any> {
    const id = params['id'];
    return this.http.delete(`${AppConstant.API_URL}tablet/delete/${id}`);
  }

}
