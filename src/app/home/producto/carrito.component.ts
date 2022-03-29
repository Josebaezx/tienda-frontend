import { Component, OnInit } from '@angular/core';
import { environment } from '@env';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  productos: Producto[]=[];
  produc: Producto;
  total: number= null;
  
  constructor(private productoservice: ProductoService) { }

  ngOnInit(): void {
    console.log(this.productoservice.detalles.productos);
    const pros = this.productoservice.detalles.productos;

    for(const item of pros){
      this.productoservice.detalle(item.id).subscribe({
        next: data => {
          this.produc = data;
          this.produc.imagen= `${environment.REST_API}${ProductoService.PRODUCTOS}/${data.imagen}`;
          this.total += this.produc.precio;
          this.productos.push(this.produc);
        },
        error: err =>{
          console.log(err.error.mensaje)
        }
      });
    }
    
  }

}
