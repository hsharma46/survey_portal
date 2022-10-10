import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { AppConstant } from '../shared/app.constant';
import { AppStorage } from '../shared/app.storage';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private headers: any = {};
  constructor(private http: HttpClient) {
    const headerObj = {
      'Content-Type': 'application/json'
    };
    this.headers = new HttpHeaders(headerObj);
  }

  getFeedback(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}feedback/getall`, { params });
  }
  getFeedbackDetails(params: any): Observable<any> {
    const id = params['_id'];
    return this.http.get(`${AppConstant.API_URL}feedback/getdetailsbyid/${id}`);
  }

  createFeedback(body = {}): Observable<any> {
    return this.http.post(`${AppConstant.API_URL}feedback/create`, body);
  }


  deleteFeedback(params: any): Observable<any> {
    const id = params['id'];
    return this.http.delete(`${AppConstant.API_URL}survey/delete/${id}`);
  }


  requestDataFromMultipleSources(params: any): Observable<any> {
    return forkJoin(params);
  }

}
