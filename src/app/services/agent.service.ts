import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../shared/app.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private headers: any = {};
  constructor(private http: HttpClient) {
    const headerObj = {
      'Content-Type': 'application/json'
    };
    this.headers = new HttpHeaders(headerObj);
  }

  getAgent(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}agent/getall`, { params });
  }

  getAgentById(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}agent/getbyid/id`, { params });
  }

  createAgent(body = {}): Observable<any> {
    return this.http.post(`${AppConstant.API_URL}agent/create`, body);
  }

  updateAgent(params: any, body = {}): Observable<any> {
    const id = params['id'];
    return this.http.put(`${AppConstant.API_URL}agent/update/${id}`, body);
  }


  deleteAgent(params: any): Observable<any> {
    const id = params['id'];
    return this.http.delete(`${AppConstant.API_URL}agent/delete/${id}`);
  }

}
