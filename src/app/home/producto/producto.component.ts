import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductoService } from './producto.service';
import { Router } from '@angular/router';
import { ProductoID } from './ProductoID';
import { Store } from '@ngrx/store';
import { addProducto } from '../../state/actions/cart.actions';
import { Producto } from './producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  
  productos: any;
  totalPages!: Array<number>;
  page = 0;
  size = 12;
  order = 'id';
  desc = true;
  isFirst = false;
  isLast = false;

  constructor(
    private productoservice: ProductoService,
    private router: Router,
    private store: Store) { }

  ngOnInit(): void {
    this.cargarProductosPaginable();
    console.log(this.productos);
  }
  
  cargarProductos(): void{
    this.productoservice.searchAll().subscribe(
      {
        next: data => {
          this.productos = data;
          console.log(data);
        },
        error: err => {
          console.log(err.error.mensaje);
        }
      }
    );
  }

  cargarProductosPaginable(): void{
    this.productoservice.searchAllPageable(this.page, this.size, this.order, this.desc).subscribe(
      {
        next: data => {
          this.productos = data['content'];
          this.isFirst = data['first']
          this.isLast = data['last'];
          this.totalPages = new Array(data['totalPages']);
          console.log(data);
        },
        error: err => {
          console.log(err.error.mensaje);
        }
      }
    );
  }

  sort(): void {
    this.desc = !this.desc;
    this.cargarProductosPaginable();
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.cargarProductosPaginable();
    }
  }

  next(): void {
    if (!this.isLast) {
      this.page++;
      this.cargarProductosPaginable();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.cargarProductosPaginable();
  }
  
  setOrder(order: string): void {
    this.order = order;
    this.cargarProductosPaginable();
  }

  agregarCarrito(producto: Producto): void{
   
    this.store.dispatch(addProducto(producto));

  }

  carrito(): void{
    this.router.navigate(['home/carrito']);
  }

}
