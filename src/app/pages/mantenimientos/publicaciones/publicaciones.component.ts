import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Publicacion } from '../../../models/publicacion.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { PublicacionService } from '../../../services/publicacion.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styles: [
  ]
})
export class PublicacionesComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public publicaciones: Publicacion[] = [];
  private imgSubs: Subscription;

  constructor( private publicacionService: PublicacionService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarPublicaciones();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarPublicaciones() );
  }

  cargarPublicaciones() {
    this.cargando = true;
    this.publicacionService.cargarPublicaciones()
      .subscribe( publicaciones => {
        this.cargando = false;
        this.publicaciones = publicaciones;
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarPublicaciones();
    }

    this.busquedasService.buscar( 'publicaciones', termino )
        .subscribe( resp => {
          this.publicaciones = resp;
        });
  }

  abrirModal(publicacion: Publicacion) {

    this.modalImagenService.abrirModal( 'publicaciones', publicacion._id, publicacion.img );

  }

  borrarPublicacion( publicacion: Publicacion ) {

    Swal.fire({
      title: '¿Borrar publicación?',
      text: `Esta a punto de borrar a ${ publicacion.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.publicacionService.borrarPublicacion( publicacion._id )
          .subscribe( resp => {

            this.cargarPublicaciones();
            Swal.fire(
              'Publicación borrada',
              `${ publicacion.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

}
