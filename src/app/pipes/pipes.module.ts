import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen.pipe';
import { ArchivoPipe } from './archivo.pipe';



@NgModule({
  declarations: [ ImagenPipe, ArchivoPipe ],
  exports: [ ImagenPipe,ArchivoPipe ],
})
export class PipesModule { }
