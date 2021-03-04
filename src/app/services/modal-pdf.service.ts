import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalPdfService {


  private _ocultarModal: boolean = true;
  public tipo: 'publicaciones';
  public id: string;
  public pdf: string;

  public nuevoPdf: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
      tipo: 'publicaciones',
      id: string,
      pdf: string = 'no-pdf'
    ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // localhost:3000/api/upload/publicaciones/no-pdf
      if ( pdf.includes('https') ) {
        this.pdf = pdf;
      } else {
        this.pdf = `${ base_url }/upload/articulo/${ tipo }/${ pdf }`;
      }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
