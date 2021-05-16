import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';
import { EscuelaService } from '../../services/escuela.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public escuelas = [];
  public escuelaSeleccionado:string;


  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService,
               private escuelaService:EscuelaService,
               private router:Router) {

    this.usuario = usuarioService.usuario;
    this.escuelaSeleccionado = this.usuario.escuela

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
      escuela: ['', Validators.required ],
    });
    this.cargarEscuelas();
  }
  cargarEscuelas(){

    this.escuelaService.cargarEscuelas()
    .subscribe( (escue:string[]) => {

      this.escuelas = escue;
    },err => console.log(err))

  }
  actualizarPerfil() {
    console.log(this.perfilForm.value)
    if(this.perfilForm.invalid){
      Swal.fire('Error','Campos no completados correctamente','error');
      return;
    }
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( () => {
          const { nombre, email,escuela } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          this.usuario.escuela = escuela;
          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }


  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
      .then( img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        this.router.navigate(['/']);
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
