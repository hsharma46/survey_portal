import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../shared/app.constant';
import { AppStorage } from '../shared/app.storage';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private headers: any = {};
  constructor(private http: HttpClient) {
    const headerObj = {
      'Content-Type': 'application/json'
    };
    this.headers = new HttpHeaders(headerObj);
  }

  getSurvey(params = {}): Observable<any> {
    //return this.http.get(`${AppConstant.API_URL}survey/getall`, { params });
    return this.http.get('assets/data.json'); 
  }
  getSurveyDetails(params = {}): Observable<any> {
    //return this.http.get(`${AppConstant.API_URL}survey/getall`, { params });
    return this.http.get('assets/survey.json'); 
  }

  createSurvey(body = {}): Observable<any> {
    //return this.http.post(`${AppConstant.API_URL}agent/create`, body);
    return new Observable((observer)=>{
      AppStorage.setItem('surveyQuestions',body);
      observer.next(true);
    })

  }


  deleteSurvey(params: any): Observable<any> {
    const id = params['id'];
    return this.http.delete(`${AppConstant.API_URL}survey/delete/${id}`);
  }
}
