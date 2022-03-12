import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardarComponent } from './guardar.component';
import { ProductoService } from './producto.service';
import {environment} from '@env';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  producto: any= [];
  archivos: any = [];
  previsualizacion?: string;
  id!: number;

  constructor(
    private productoservice: ProductoService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id= this.activateRoute.snapshot.params['id'];
    this.productoservice.detalle(this.id).subscribe(
      data => {
        this.producto = data;
        this.producto.imagen= `${environment.REST_API}${ProductoService.PRODUCTOS}/${data.imagen}`;
      },
      error => {
        console.log(error.error.mensaje)
      }
    )
    
  }
  
  editarDatos(){
    if(this.previsualizacion != null){
      this.enviarImagen();
    }
    this.productoservice.update(this.id, this.producto).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['']);
      },
      error => {
        console.log(error.error.mensaje)
      }
    )
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    if(archivoCapturado.size < GuardarComponent.MAXIMO_TAMANIO_BYTES){
      this.extraerBase64(archivoCapturado).then((imagen: any ) => {
        this.previsualizacion = imagen.base;
        this.producto.imagen= imagen.blob.name;
        console.log(imagen);
      })
      this.archivos.push(archivoCapturado);
      //console.log(event.target.files)
    }else{
      alert('Archivo maximo de carga son 1MB')
    }
      
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        })
      }
    } catch (e) {
      return null;
    }
    return void 0
  });

  enviarImagen(): any{
    try {
      const formularioDeDatos = new FormData();
      formularioDeDatos.append('file', this.archivos[0]);
      this.productoservice.saveFile(formularioDeDatos).subscribe(
        () => {
          console.log('Imagen guardada');
          //this.router.navigate(['']);
        },
        error => {
          console.log(error.error.mensaje)
        }
      );
    } catch (error) {
      
    }
  }

  reset():void{
    window.location.reload();
  }

  delete(): void{
    if (window.confirm("Va eliminar un producto?")) {
      this.productoservice.delete(this.id).subscribe(
        () => {
          console.log('Eliminado correctamente! id='+ this.id)
          this.router.navigate(['']);
        },
        error => {
          console.log(error.error.mensaje)
        }
      );
    }
  }
  
}
