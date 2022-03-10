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
  private static UPDATE = '/productos/update';
  private static DETALLE = '/productos/producto';
  private static DELETE = '/productos/delete';

  constructor(private httpService: HttpService) { }

  searchAll(): Observable<Producto[]> {
    return this.httpService.get(ProductoService.PRODUCTOS);
  }

  detalle(id: number): Observable<Producto> {
    return this.httpService.get(`${ProductoService.DETALLE}/${id}`);
  }

  saveProduct(body: ProductoDto): Observable<any>{
    return this.httpService.post(ProductoService.PRODUCTOS, body);
  }

  saveFile(file: any): Observable<any>{
    return this.httpService.postFile(ProductoService.UPLOAD, file);
  }

  update(id: number, body: Producto): Observable<any>{
    return this.httpService.put(`${ProductoService.UPDATE}/${id}`, body)
  }

  delete(id: number): Observable<Producto> {
    return this.httpService.delete(`${ProductoService.DELETE}/${id}`, id);
  }





}
