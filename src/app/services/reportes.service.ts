import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  public escuelas = []
  constructor(
    private _http : HttpClient,
  ) { }
  getEscuelas(ejemplo:string){
    //let ejemplo = 'EPICI';
    return this._http.get(`${ base_url }/publicaciones/carrera/${ ejemplo }`)
  }
}
