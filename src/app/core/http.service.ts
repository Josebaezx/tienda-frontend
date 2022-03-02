import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  static URI = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any>{
    return this.http.get(HttpService.URI + endpoint)
  }
}
