import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ArticuloAprobado } from '../models/articuloaprobado.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ArticuloaprobadoserviceService {

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
  cargarArticulosAprobados() {

    const url = `${ base_url }/articulosaprobados`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, articulosAprobados: ArticuloAprobado[] }) => resp.articulosAprobados )
              );
  }
 
  crearArticuloAprobado( value:string ){
    const url =  `${ base_url }/articulosaprobados`;
    return this.http.post( url,{nombre:value}, this.headers )

  }

  eliminarArticuloAprobado( _id: string  ){
    const url =  `${ base_url }/articulosaprobados/${_id}`;
    return this.http.delete( url, this.headers )
  }
}
