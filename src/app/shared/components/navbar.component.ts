import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCountProductos } from '../../state/selectors/cart.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  countProductos$: Observable<number>;

  constructor(private store: Store) {
    this.countProductos$ = store.select(selectCountProductos);
  }

  ngOnInit(): void {
  }

}
