import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Tema } from '../../../models/tema.model';
import { Publicacion } from '../../../models/publicacion.model';

import { TemaService } from '../../../services/tema.service';
import { PublicacionService } from '../../../services/publicacion.service';
import { delay } from 'rxjs/operators';



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

  constructor( private fb: FormBuilder,
               private temaService: TemaService,
               private publicacionService: PublicacionService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    console.log(this.publicacionSeleccionado)
    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarPublicacion( id ) );

    this.publicacionForm = this.fb.group({
      nombre: ['', Validators.required ],
      tema: ['', Validators.required ],
      contenido:['',Validators.required],

    });

    this.cargarTemas();

    this.publicacionForm.get('tema').valueChanges
        .subscribe( temaId => {
          this.temaSeleccionado = this.temas.find( h => h._id === temaId );
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

        const { nombre, tema:{ _id }, contenido } = publicacion;
        this.publicacionSeleccionado = publicacion;
        this.publicacionForm.setValue({ nombre, tema: _id, contenido});
      },err=>console.log(err));

  }

  cargarTemas() {

    this.temaService.cargarTemas()
      .subscribe( (temas: Tema[]) => {
        this.temas = temas;
      })

  }

  guardarPublicacion() {

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
        })
    }



  }




}
