import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EscuelaService {

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
  cargarEscuelas() {

    const url = `${ base_url }/escuelas`;
    return this.http.get( url,this.headers )

  }
}
