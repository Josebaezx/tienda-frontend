import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { AdviserComponent } from './adviser/adviser.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoService } from './producto/producto.service';



@NgModule({
  declarations: [
    HomeComponent,
    AdviserComponent,
    ProductoComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [
    ProductoService
  ]
})
export class HomeModule { }
