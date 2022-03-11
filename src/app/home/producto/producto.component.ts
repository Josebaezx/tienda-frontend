import { Component, OnInit } from '@angular/core';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  productos: Producto[]= [];
  body?: Producto;
  file?: File;
  constructor(private productoservice: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
    console.log(this.productos);
  }
  
  cargarProductos(): void{
    this.productoservice.searchAll().subscribe(
      {
        next: data => {
          this.productos = data;
        },
        error: error => {
          console.log(error);
        }
      }
    );
  }

}
