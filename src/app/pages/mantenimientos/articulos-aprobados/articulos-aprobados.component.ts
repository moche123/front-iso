import { Component, OnInit } from '@angular/core';
import { ArticuloAprobado } from 'src/app/models/articuloaprobado.model';
import { Publicacion } from 'src/app/models/publicacion.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ArticuloaprobadoserviceService } from 'src/app/services/articuloaprobadoservice.service'
import { BusquedasService } from 'src/app/services/busquedas.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-articulos-aprobados',
  templateUrl: './articulos-aprobados.component.html',
  styleUrls: ['./articulos-aprobados.component.css']
})
export class ArticulosAprobadosComponent implements OnInit {
  public cargando: boolean = true;
  public publicaciones: Publicacion[] = [];
  public listArticulos = [];
  public usuario:Usuario;


  constructor(
    private articuloAprobadoService:ArticuloaprobadoserviceService,
    private publicacionService: PublicacionService,
    private busquedasService: BusquedasService,
    private usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    console.log(this.usuario);
    this.cargarArticulosAprobados();
  }
  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear tema',
      text: 'Ingrese el nombre del articulo a agregar',
      input: 'text',
      inputPlaceholder: 'Nombre del articulo',
      showCancelButton: true,
    });

    if( value.trim().length > 0 ) {
      this.articuloAprobadoService.crearArticuloAprobado( value )
        .subscribe( (resp: any) => {
          Swal.fire(' Creado', `${value} creado!`, 'success')
        this.cargarArticulosAprobados();
        })
    }
  }

  cargarArticulosAprobados() {
    this.cargando = true;
    this.articuloAprobadoService.cargarArticulosAprobados()
      .subscribe( e => {
        this.cargando = false;
        console.log(e);
        this.listArticulos = e.filter(art => art.habilitado == true);
      });
  }
  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarArticulosAprobados();
    }

    this.busquedasService.buscar( 'publicacionesaprobadas', termino )
        .subscribe( resp => {
          this.listArticulos = resp;
        });
  }



  eliminarTema( articulo: ArticuloAprobado ) {
    Swal.fire({
      title: '¿Borrar Artículo aprobado?',
      text: `Esta a punto de borrar a ${ articulo.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        console.log(articulo._id)
        this.articuloAprobadoService.eliminarArticuloAprobado( articulo._id )
        .subscribe( resp => {
          this.cargarArticulosAprobados();
          Swal.fire( ' Borrado', articulo.nombre, 'success' );
          Swal.fire(
            'Tema borrado',
            `${articulo.nombre} fue eliminado correctamente`,
            'success'
          );
        },err=>{
          Swal.fire( ' Ups', 'Error eliminando archivo', 'error' );
        });
      }
    })

  }

}
