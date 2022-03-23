import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http.service';
import { Producto } from './producto.model';
import { ProductoDto } from './productoDto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public static PRODUCTOS = '/productos';
  public static UPLOAD = '/productos/upload';
  public static PAGEABLE = '/productos/pageable';
  public static UPDATE = '/productos/update';
  public static DETALLE = '/productos/producto';
  public static DELETE = '/productos/delete';

  constructor(private httpService: HttpService) { }

  searchAll(): Observable<Producto[]> {
    return this.httpService.get(ProductoService.PRODUCTOS);
  }

  searchAllPageable(page: number, size: number, order: string, desc: boolean): Observable<Producto[]> {
    return this.httpService.get(ProductoService.PAGEABLE+`?page=${page}&size=${size}&order=${order}&desc=${desc}`);
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
