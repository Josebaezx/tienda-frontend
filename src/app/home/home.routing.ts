import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { ProductoComponent } from './producto/producto.component';
import { AdviserComponent } from './adviser/adviser.component';
import { GuardarComponent } from './producto/guardar.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      {path: 'adviser' , component: AdviserComponent},
      {path: 'bienvenido', component: ProductoComponent},
      {path: 'guardar', component: GuardarComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule{}
