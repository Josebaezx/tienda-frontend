import { Component, OnInit } from '@angular/core';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[]= [];

  constructor(private productoservice: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
    console.log(this.productos);
  }


  

  cargarProductos(): void{
    this.productoservice.searchAll().subscribe(
      data => {
        this.productos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
