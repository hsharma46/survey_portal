import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../shared/app.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private headers: any = {};
  constructor(private http: HttpClient) {
    const headerObj = {
      'Content-Type': 'application/json'
    };
    this.headers = new HttpHeaders(headerObj);
  }

  getProduct(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}product/getall`, { params });
  }

  getProductById(params = {}): Observable<any> {
    return this.http.get(`${AppConstant.API_URL}product/getbyid/id`, { params });
  }

  createProduct(body = {}): Observable<any> {
    return this.http.post(`${AppConstant.API_URL}product/create`, body);
  }

  updateProduct(params: any, body = {}): Observable<any> {
    const id = params['id'];
    return this.http.put(`${AppConstant.API_URL}product/update/${id}`, body);
  }

  deleteProduct(params: any): Observable<any> {
    const id = params['id'];
    return this.http.delete(`${AppConstant.API_URL}product/delete/${id}`);
  }

  linkProductWithTablet(params: any, body = {}): Observable<any> {
    const id = params['id'];
    return this.http.post(`${AppConstant.API_URL}product/link/${id}`, body);
  }

}
