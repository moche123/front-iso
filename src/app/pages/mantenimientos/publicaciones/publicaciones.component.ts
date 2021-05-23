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
import { UsuarioService } from 'src/app/services/usuario.service';
import { Tema } from 'src/app/models/tema.model';
import { TemaService } from 'src/app/services/tema.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';



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
  public temas: Tema[] = [];
  public publicacionForm: FormGroup;
  public temaSeleccionado: Tema;
  public usuario:Usuario;

  constructor( private publicacionService: PublicacionService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService,
              private modalPdfService:ModalPdfService,
              private pdfUploadService:PdfUploadService,
              private router:Router,
              private temaService: TemaService,
              private fb: FormBuilder,

              private usuarioService:UsuarioService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }
  guardarPublicacion(){
    console.log('hola')
  }
  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    console.log(this.usuario);
    this.cargarPublicaciones();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarPublicaciones() );
    this.publicacionForm = this.fb.group({

        tema: ['', Validators.required ],


      });
    this.cargarTemas();
    this.publicacionForm.get('tema').valueChanges
    .subscribe( async temaId => {
          this.temaSeleccionado = await this.temas.find( h => h._id === temaId && h.habilitado == true);
          this.filtrarTema(this.temaSeleccionado);
    })
  }
  filtrarTema(temaSeleccionado:Tema){
    console.log(temaSeleccionado)
    if(temaSeleccionado == null || temaSeleccionado == undefined){
      return this.cargarPublicaciones()
    }
    this.busquedasService.filtrarTema(temaSeleccionado).subscribe(
      (e:any) => {
        this.publicaciones = e.resultado
        console.log(this.publicaciones)
      }
    )
  }
  cargarTemas() {

    this.temaService.cargarTemas()
      .subscribe( (temas: Tema[]) => {
        this.temas = temas.filter(t  => t.habilitado);
      })

  }
  cargarPublicaciones() {
    this.cargando = true;
    this.publicacionService.cargarPublicaciones()
      .subscribe( publicaciones => {
        this.cargando = false;
        this.publicaciones = publicaciones.filter(pub => pub.habilitado && pub.tema.habilitado);
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
    if(this.usuario.email.split('@')[1] == 'unprg.edu.pe'){
      this.modalImagenService.abrirModal( 'publicaciones', publicacion._id, publicacion.img );

    }

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
    this.modalPdfService.nuevoPdf.subscribe(e =>{
      this.cargarPublicaciones()
    })
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
  owner(publicacion:Publicacion){
    let idUsuario;
    let emailUsuario;
    if(!publicacion.usuario._id){
      idUsuario = publicacion['usuario'];
    }else{
      idUsuario = publicacion.usuario._id
      emailUsuario = publicacion.usuario.email;
    }
    if(emailUsuario != undefined && emailUsuario.split('@')[1] == "hotmail.com"){
      return false;
    }else{
      if(this.usuarioService.usuario.uid == idUsuario){
        return true
      }
    }

  }
}
