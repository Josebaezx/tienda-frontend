import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { ProductoComponent } from './producto/producto.component';
import { AdviserComponent } from './adviser/adviser.component';
import { GuardarComponent } from './producto/guardar.component';
import { EditarComponent } from './producto/editar.component';
import { CarritoComponent } from './producto/carrito.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      {path: 'adviser' , component: AdviserComponent},
      {path: 'agregar', component: GuardarComponent},
      {path: 'bienvenido', component: ProductoComponent},
      {path: 'carrito', component: CarritoComponent},
      {path: 'editar/:id', component: EditarComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule{}
