import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, publishBehavior } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Publicacion } from '../../../models/publicacion.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { PublicacionService } from '../../../services/publicacion.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { ModalPdfService } from '../../../services/modal-pdf.service';

import { PdfUploadService } from 'src/app/services/pdf-upload.service';
import { Router } from '@angular/router';


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
               private busquedasService: BusquedasService,
              private modalPdfService:ModalPdfService,
              private pdfUploadService:PdfUploadService,
              private router:Router ) { }

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
        console.log(this.publicaciones)
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
    console.log(publicacion.img)
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
  abrirModalPdf(publicacion: Publicacion) {
    console.log(publicacion.articulo)
    this.modalPdfService.abrirModal( 'publicaciones', publicacion._id, publicacion.articulo );

  }
  esunNoPdf(ruta:string):boolean{

    let rutaAux = (ruta.split('/')[ruta.split('/').length-1])
    if(rutaAux === 'no-pdf'){
      return true
    }else{
      return false;
    }

  }
  mostrarArchivo(linkRuta:string){
    console.log(linkRuta)
    this.pdfUploadService.devolver(linkRuta)
  }
}
