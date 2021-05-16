import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Comentario } from '../models/comentario.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }
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
  crearComentario( contenido:string,autor:string ){
    const url =  `${ base_url }/comentarios`;
    return this.http.post( url,{contenido,autor}, this.headers )

  }
  cargarComentarios() {

    const url = `${ base_url }/comentarios`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, comentarios: Comentario[] }) => resp.comentarios )
              );
  }
}
