import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../shared/app.constant';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private headers: any = {};
  constructor(private http: HttpClient) {
    const headerObj = {
      'Content-Type': 'application/json'
    };
    this.headers = new HttpHeaders(headerObj);
  }

  getAnswer(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}answer/getall`, { params }); 
  }

  createAnswer(body = {}): Observable<any> {
    return this.http.post(`${AppConstant.API_URL}answer/create`, body);
  }

  updateAnswer(params: any, body = {}): Observable<any> {
    const id = params['id'];
    return this.http.put(`${AppConstant.API_URL}answer/update/${id}`, body);
  }


  deleteAnswer(params: any): Observable<any> {
    const id = params['id'];
    return this.http.delete(`${AppConstant.API_URL}answer/delete/${id}`);
  }
}
