import { Component, OnInit } from '@angular/core';
import { environment } from '@env';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';
import { Observable } from 'rxjs';
import { ProductoID } from './ProductoID';
import { Store } from '@ngrx/store';
import { selectProductos } from 'app/state/selectors/cart.selectors';
import { selectTotalPrice } from '../../state/selectors/cart.selectors';
import { clearCart, removeCart } from 'app/state/actions/cart.actions';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  totalPrice$: Observable<number>;
  pros$: Observable<any>;

  constructor(
    private productoservice: ProductoService,
    private store: Store) { 
    this.pros$ = store.select(selectProductos);
    this.totalPrice$ = store.select(selectTotalPrice);
  }

  ngOnInit(): void { }

  clearEntries () {
    this.store.dispatch(clearCart());
  }

  remove(producto: ProductoID){
    this.store.dispatch(removeCart(producto))
  }

}
