import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../shared/app.constant';

@Injectable({
  providedIn: 'root'
})
export class MQQuestionService {

  private headers: any = {};
  constructor(private http: HttpClient) {
    const headerObj = {
      'Content-Type': 'application/json'
    };
    this.headers = new HttpHeaders(headerObj);
  }

  getQuestion(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}mqquestion/getall`, { params }); 
  }

  createQuestion(body = {}): Observable<any> {
    return this.http.post(`${AppConstant.API_URL}mqquestion/create`, body);
  }

  updateQuestion(params: any, body = {}): Observable<any> {
    const id = params['id'];
    return this.http.put(`${AppConstant.API_URL}mqquestion/update/${id}`, body);
  }


  deleteQuestion(params: any): Observable<any> {
    const id = params['id'];
    return this.http.delete(`${AppConstant.API_URL}mqquestion/delete/${id}`);
  }
}
