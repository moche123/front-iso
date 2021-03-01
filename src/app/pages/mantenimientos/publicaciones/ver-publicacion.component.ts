import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Publicacion } from 'src/app/models/publicacion.model';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: []
})
export class VerPublicacionComponent implements OnInit {
  //ULR
  uri_publicacion = 'http://localhost:3000/api/upload/publicaciones/';
  //Contenidos
  textoPublicacion:string = '';
  tituloPublicacion:string = '';
  imagenPublicacion:string = '';
  autorPublicacion:string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private publicacionService:PublicacionService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarPublicacion( id ) );
  }
  cargarPublicacion(id:string){
    this.publicacionService.obtenerPublicacionPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( (publicacion:Publicacion) => {
        console.log(publicacion)
        this.textoPublicacion = publicacion.contenido
        this.tituloPublicacion = publicacion.nombre
        this.imagenPublicacion = `${this.uri_publicacion}${publicacion.img}`
        this.autorPublicacion = publicacion.usuario.nombre
      })
  }
}

//http://localhost:3000/api/upload/publicaciones/766eb5b9-11a6-4d51-80dd-01af88a57d94.png
