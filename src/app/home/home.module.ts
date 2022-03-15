import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { AdviserComponent } from './adviser/adviser.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoService } from './producto/producto.service';
import { GuardarComponent } from './producto/guardar.component';
import { FormsModule } from '@angular/forms';
import { EditarComponent } from './producto/editar.component';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator'; 

@NgModule({
  declarations: [
    HomeComponent,
    AdviserComponent,
    ProductoComponent,
    GuardarComponent,
    EditarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  providers: [
    ProductoService
  ]
})
export class HomeModule { }
