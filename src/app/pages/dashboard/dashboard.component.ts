import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Tema } from '../../models/tema.model';
import { Publicacion } from '../../models/publicacion.model';

import { TemaService } from '../../services/tema.service';
import { PublicacionService } from '../../services/publicacion.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { ComentarioService } from 'src/app/services/comentario.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
 
})
export class DashboardComponent implements OnInit {
  public comentarioForm: FormGroup;
  public usuarioId:string = '';
  public usuarioNombre:string = '';
  //public comentarios = [];
  constructor(
    //private fb: FormBuilder,
    public userService: UsuarioService,
    public publicacionService:PublicacionService
    //public comentarioService:ComentarioService
  ) {
    this.usuarioId = this.userService.usuario.uid;
    this.usuarioNombre = this.userService.usuario.nombre;
  }
 
  ngOnInit(): void {
    /* this.cargarComentarios();
    this.comentarioForm = this.fb.group({
      usuario: [this.usuarioId, Validators.required ],
      contenido:['',Validators.required],
    }); */
    
  } 
 
 /*  guardarComentario(){
    if(this.comentarioForm.value.contenido.length>0){
      this.comentarioService.crearComentario(this.comentarioForm.value.contenido,
        this.comentarioForm.value.usuario).subscribe(e =>{
          Swal.fire('Genial','Comentario creado correctamente','success');
          this.cargarComentarios();
        })
    }
  }
  cargarComentarios(){
    this.comentarioService.cargarComentarios().subscribe(e =>{
      console.log(e)
      this.comentarios = e
    })
  } */


}
