import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { ProductoComponent } from './producto/producto.component';
import { AdviserComponent } from './adviser/adviser.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
    {path: 'bienvenido', component: ProductoComponent},
    {path: 'adviser' , component: AdviserComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule{}
