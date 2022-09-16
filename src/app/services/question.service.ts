import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../shared/app.constant';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private headers: any = {};
  constructor(private http: HttpClient) {
    const headerObj = {
      'Content-Type': 'application/json'
    };
    this.headers = new HttpHeaders(headerObj);
  }

  getQuestion(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}question/getall`, { params }); 
  }

  createQuestion(body = {}): Observable<any> {
    return this.http.post(`${AppConstant.API_URL}question/create`, body);
  }

  updateQuestion(params: any, body = {}): Observable<any> {
    const id = params['id'];
    return this.http.put(`${AppConstant.API_URL}question/update/${id}`, body);
  }


  deleteQuestion(params: any): Observable<any> {
    const id = params['id'];
    return this.http.delete(`${AppConstant.API_URL}question/delete/${id}`);
  }
}
