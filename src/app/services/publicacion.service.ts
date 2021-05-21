import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

import { Publicacion } from '../models/publicacion.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

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

 
  cargarPublicaciones() {

    const url = `${ base_url }/publicaciones`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, publicaciones: Publicacion[] }) => resp.publicaciones )
              );
  }

  obtenerPublicacionPorId( id: string ) {

    const url = `${ base_url }/publicaciones/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, publicacion: Publicacion }) => resp.publicacion )
              );
  }
 
  crearPublicacion( publicacion: { nombre: string, tema: string } ) {

    const url = `${ base_url }/publicaciones`;
    return this.http.post( url, publicacion, this.headers );
  }

  actualizarPublicacion( publicacion: Publicacion  ) {

    const url = `${ base_url }/publicaciones/${ publicacion._id }`;
    return this.http.put( url, publicacion, this.headers );
  }

  borrarPublicacion( _id: string ) {

    const url = `${ base_url }/publicaciones/${ _id }`;
    return this.http.delete( url, this.headers );
  }
  verificarArticuloAprobado( texto:string ){
    const url = `${ base_url }/publicaciones/articuloaprobadoid/${ texto }`;
    return this.http.get(url, this.headers)
  }

}
