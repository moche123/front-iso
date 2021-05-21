import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';

import { Tema } from '../models/tema.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class TemaService {


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


  cargarTemas() {

    const url = `${ base_url }/temas`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, temas: Tema[] }) => resp.temas )
              );
  }

  crearTema( nombre: string ) {

    const url = `${ base_url }/temas`;
    return this.http.post( url, { nombre }, this.headers );
  }

  actualizarTema( _id: string, nombre: string  ) {

    const url = `${ base_url }/temas/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarTema( _id: string ) {

    const url = `${ base_url }/temas/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
