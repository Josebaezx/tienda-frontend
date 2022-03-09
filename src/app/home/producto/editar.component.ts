import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';
import { ProductoDto } from './productoDto';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  producto!: Producto;
  produc!: ProductoDto;
  archivos: any = [];
  previsualizacion?: string;
  
  constructor(
    private productoservice: ProductoService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const id= this.activateRoute.snapshot.params['id'];
    this.productoservice.detalle(id).subscribe(
      data => {
        this.producto = data;
      },
      error => {
        console.log(error)
      }
    )
  }
  
  editarDatos(){
    this.enviarImagen();
    const id= this.activateRoute.snapshot.params['id'];
    this.productoservice.update(id, this.producto).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['']);
      },
      error => {
        console.log(error)
      }
    )
  }

  
  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any ) => {
      this.previsualizacion = imagen.base;
      this.producto.imagen= imagen.blob.name;
      console.log(imagen);
    })
    this.archivos.push(archivoCapturado);
    //console.log(event.target.files)
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

  reset():void{
    window.location.reload();
  }
  
}