import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Tema } from '../../../models/tema.model';
import { Publicacion } from '../../../models/publicacion.model';

import { TemaService } from '../../../services/tema.service';
import { PublicacionService } from '../../../services/publicacion.service';
import { debounceTime, delay, tap } from 'rxjs/operators';



@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styles: [
  ]
})
export class PublicacionComponent implements OnInit {

  public publicacionForm: FormGroup;
  public temas: Tema[] = [];

  public publicacionSeleccionado: Publicacion;
  public temaSeleccionado: Tema;
  public pdfSubir: File;
  public pdfTemp: any = null;
  public codigoCAA:boolean = true;
  public mensajeEncontrado = '';

  constructor( private fb: FormBuilder,
               private temaService: TemaService,
               private publicacionService: PublicacionService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.codigoCAA = true;
    console.log(this.publicacionSeleccionado)
    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarPublicacion( id ) );

    this.publicacionForm = this.fb.group({
      nombre: ['', Validators.required ],
      tema: ['', Validators.required ],
      contenido:['',Validators.required],
      caa:['',Validators.required]
    });

    this.cargarTemas();

    this.publicacionForm.get('tema').valueChanges
        .subscribe( temaId => {
          this.temaSeleccionado = this.temas.find( h => h._id === temaId && h.habilitado == true);
        })
  }

  cargarPublicacion(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

     this.publicacionService.obtenerPublicacionPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( publicacion => {

        if ( !publicacion ) {
          return this.router.navigateByUrl(`/dashboard/publicaciones`);
        }

        const { nombre, tema:{ _id }, contenido,caa } = publicacion;
        this.publicacionSeleccionado = publicacion;
        this.publicacionForm.setValue({ nombre, tema: _id, contenido, caa});
      },err=>console.log(err));

  }

  cargarTemas() {

    this.temaService.cargarTemas()
      .subscribe( (temas: Tema[]) => {
        this.temas = temas.filter(t => t.habilitado == true);
      })

  }

  guardarPublicacion() {
    console.log('Hola');
    if(this.publicacionForm.invalid){
      Swal.fire('Atención','Llena los campos','warning');
      return;
    }
    const { nombre } = this.publicacionForm.value;

    if ( this.publicacionSeleccionado ) {
      // actualizar
      const data = {
        ...this.publicacionForm.value,
        _id: this.publicacionSeleccionado._id
      }
      this.publicacionService.actualizarPublicacion( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear

      this.publicacionService.crearPublicacion( this.publicacionForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');

            this.router.navigateByUrl(`/dashboard/publicacion/${ resp.publicacion._id }`)
        },err=>{
            Swal.fire('Error', `Tema presenta errores al crearse`, 'error');
        })
    }



  }
  existeArticuloAprobado(event){
    //console.log(event.target.value)
    if(/* event.target.value.length>20 */1==1){
      this.publicacionService.verificarArticuloAprobado(event.target.value).
      subscribe((e:any) =>{
        console.log(e)
        if(e.articulo.length == 1){
          this.codigoCAA = true;
          if(e.articulo){
            this.mensajeEncontrado = 'Codigo encontrado'
          }
        }else{
          console.log('no encontrado');
        this.codigoCAA = false;
        this.mensajeEncontrado = ''
        }

      },err =>{
        console.log('no encontrado');
        this.codigoCAA = false;
        this.mensajeEncontrado = ''
      })
    }else{
      this.codigoCAA = false;
      this.mensajeEncontrado = ''
    }

  }



}
