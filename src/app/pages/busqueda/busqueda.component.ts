import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';

import { Tema } from 'src/app/models/tema.model';
import { Publicacion } from '../../models/publicacion.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public publicaciones: Publicacion[] = [];
  public temas: Tema[] = [];


  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ));

  }

  busquedaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp)
          this.usuarios   = resp.usuarios;
          this.publicaciones    = resp.publicaciones;
          this.temas = resp.temas;
        });

  }


  abrirPublicacion( publicacion: Publicacion ) {

  }

}
