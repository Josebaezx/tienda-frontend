import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../home/producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  static URI = 'http://localhost:8080/api/v1';
  producto!: Producto;
  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any>{
    return this.http.get(HttpService.URI + endpoint)
  }

  post(endpoint: string, body: object): Observable<any> {
    return this.http.post(HttpService.URI + endpoint, body);
  }

  postFile(endpoint: string, file: any): Observable<any> {
    return this.http.post(HttpService.URI + endpoint, file);
  }

  put(endpoint: string, body: object): Observable<any> {
    return this.http.put(HttpService.URI + endpoint, body)
  }

}
