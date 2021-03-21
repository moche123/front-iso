import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Tema } from '../../../models/tema.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { TemaService } from '../../../services/tema.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';




@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styles: [
  ]
})
export class TemasComponent implements OnInit, OnDestroy {

  public temas: Tema[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor( private temaService: TemaService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService,
               private usuarioService: UsuarioService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarTemas();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarTemas() );
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarTemas();
    }

    this.busquedasService.buscar( 'temas', termino )
        .subscribe( resp => {

          this.temas = resp;

        });
  }

  cargarTemas() {

    this.cargando = true;
    this.temaService.cargarTemas()
        .subscribe( temas => {
          this.cargando = false;
          this.temas = temas;
        })

  }

  guardarCambios( tema: Tema ) {


    this.temaService.actualizarTema( tema._id, tema.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', tema.nombre, 'success' );
        });

  }

  eliminarTema( tema: Tema ) {
    Swal.fire({
      title: '¿Borrar Tema?',
      text: `Esta a punto de borrar a ${ tema.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
    this.temaService.borrarTema( tema._id )
        .subscribe( resp => {
          this.cargarTemas();
          Swal.fire( ' Borrado', tema.nombre, 'success' );
          Swal.fire(
            'Tema borrado',
            `${tema.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    })

  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear tema',
      text: 'Ingrese el nombre del nuevo tema',
      input: 'text',
      inputPlaceholder: 'Nombre del tema',
      showCancelButton: true,
    });

    if( value.trim().length > 0 ) {
      this.temaService.crearTema( value )
        .subscribe( (resp: any) => {
          this.temas.push( resp.tema )
        })
    }
  }

  abrirModal(tema: Tema) {

    this.modalImagenService.abrirModal( 'temas', tema._id, tema.img );

  }
  owner(tema:Tema){
    if(this.usuarioService.usuario.uid == tema.usuario._id){
      return true
    }
    return false

  }
}
