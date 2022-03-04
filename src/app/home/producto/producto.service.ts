import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http.service';
import { Producto } from './producto.model';
import { ProductoDto } from './productoDto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private static PRODUCTOS = '/productos';
  private static UPLOAD = '/productos/upload';

  constructor(private httpService: HttpService) { }

  searchAll(): Observable<Producto[]> {
    return this.httpService.get(ProductoService.PRODUCTOS);
  }

  saveProduct(body: ProductoDto): Observable<any>{
    return this.httpService.post(ProductoService.PRODUCTOS, body);
  }

  saveFile(file: any): Observable<any>{
    return this.httpService.postFile(ProductoService.UPLOAD, file);
  }



}
