import { Component, OnInit } from '@angular/core';
import { ProductoDto } from './productoDto';
import { ProductoService } from './producto.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-guardar',
  templateUrl: './guardar.component.html',
  styleUrls: ['./guardar.component.css']
})
export class GuardarComponent implements OnInit {
    codigo: string = '';
    color: string = '';
    marca: string = '';
    precio: number = 0;
    tipo: string = '';
    imagen: string = '';
    archivos: any = [];
    previsualizacion?: string;
    public static MAXIMO_TAMANIO_BYTES = 1048576

  constructor(
    private productoservice: ProductoService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  guardarDatos(): void{
    this.enviarImagen();
    const producto = new ProductoDto(this.codigo,this.color,this.marca,this.precio,this.tipo,this.imagen);
    this.productoservice.saveProduct(producto).subscribe(
      () => {
        console.log('Producto enviado');
        this.router.navigate(['']);
      },
      error => {
        console.log(error)
      }
    );
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    if(archivoCapturado.size < GuardarComponent.MAXIMO_TAMANIO_BYTES){
      this.extraerBase64(archivoCapturado).then((imagen: any ) => {
        this.previsualizacion = imagen.base;
        this.imagen= imagen.blob.name;
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
          console.log(error)
        }
      );
    } catch (error) {
      
    }
  }



}
