import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'archivo'
})
export class ArchivoPipe implements PipeTransform {
  transform( articulo: string, tipo: 'publicaciones'): string {

    if ( !articulo ) {
      return `${ base_url }/upload/articulo/publicaciones/no-pdf`;
  } else if ( articulo.includes('https') ) {
      return articulo;
  } else if ( articulo ) {
      return `${ base_url }/upload/articulo/${ tipo }/${ articulo }`;
  } else {
      return `${ base_url }/upload/articulo/publicaciones/no-pdf`;
  }


  }

}
