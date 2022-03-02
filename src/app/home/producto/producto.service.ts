import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http.service';
import { Producto } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private static PRODUCTOS = '/productos';

  constructor(private httpService: HttpService) { }

  searchAll(): Observable<Producto[]> {
    return this.httpService
      .get(ProductoService.PRODUCTOS);
  }
}
