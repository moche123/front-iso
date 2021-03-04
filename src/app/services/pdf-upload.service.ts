import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators';
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class PdfUploadService {

  constructor(
    private http:HttpClient
  ) { }

  async actualizarPdf(
    archivo: File,
    tipo: 'publicaciones',
    id: string
  ) {
    console.log(archivo,tipo,id)
    try {

      const url = `${ base_url }/upload/articulo/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('pdf', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if ( data.ok ) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }

   async devolver(ruta:string){

    try {

      const url = ruta;
      const resp = await fetch(url);
      resp.blob().then(blob => this.download(blob,resp))

    } catch (error) {
      console.log(error);
      return false;
    }
  }
  download(blob, filename){
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
