import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ComentarioService } from 'src/app/services/comentario.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  public comentarioForm: FormGroup;
  public usuarioId:string = '';
  public usuarioNombre:string = '';
  //public comentarios = [];
  constructor(
    //private fb: FormBuilder,
    public userService: UsuarioService,
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
