import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { Tema } from '../models/tema.model';
import { Publicacion } from '../models/publicacion.model';
import { ArticuloAprobado } from '../models/articuloaprobado.model';
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    );
  }

  private transformarTemas( resultados: any[] ): Tema[] {
    return resultados;
  }

  private transformarPublicaciones( resultados: any[] ): Publicacion[] {
    return resultados;
  }

  private transformarArticulosAprobados( resultados: any[] ): ArticuloAprobado[] {
    return resultados;
  }

  busquedaGlobal( termino: string ) {

    const url = `${ base_url }/todo/${ termino }`;
    return this.http.get( url, this.headers );

  }


  buscar(
      tipo: 'usuarios'|'publicaciones'|'temas'|'publicacionesaprobadas',
      termino: string
    ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
            .pipe(
              map( (resp: any ) => {

                switch ( tipo ) {
                  case 'usuarios':
                    return this.transformarUsuarios( resp.resultados )

                  case 'temas':
                    return this.transformarTemas( resp.resultados )

                  case 'publicaciones':
                     return this.transformarPublicaciones( resp.resultados )

                  case 'publicacionesaprobadas':
                     return this.transformarArticulosAprobados(resp.resultados)

                  default:
                    return [];
                }

              })
            );

  }
 filtrarTema(tema:Tema){

   const url = `${ base_url }/publicaciones/tema/${ tema.nombre }`;
   return this.http.get(url)
 }

}
