import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { PdfUploadService } from '../../services/pdf-upload.service';
import { ModalPdfService } from '../../services/modal-pdf.service';
import { PublicacionesComponent } from 'src/app/pages/mantenimientos/publicaciones/publicaciones.component';



@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styleUrls: []
})
export class ModalPdfComponent implements OnInit {

  public pdfSubir: File;
  public pdfTemp: any = null;
  public pdfImg:string = './assets/images/temasimg/pdfImage.png';
  public sePudoSubir:boolean = false;

  constructor( public modalPdfService: ModalPdfService,
               public pdfUploadService: PdfUploadService  ) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.pdfTemp = null;
    this.modalPdfService.cerrarModal();
  }

  cambiarPdf( file: File ) {
    //console.log(file)
    this.pdfSubir = file;

    if ( !file ) {
      return this.pdfTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.pdfTemp = reader.result;
    }

  }

  subirPdf() {
    this.sePudoSubir = false;
    const id   = this.modalPdfService.id;
    const tipo = this.modalPdfService.tipo;
    console.log(id,tipo)
    this.pdfUploadService
      .actualizarPdf( this.pdfSubir, tipo, id )
      .then( pdf => {
        Swal.fire('Guardado', `Pdf de ${tipo} actualizado`, 'success');

        this.modalPdfService.nuevoPdf.emit(pdf);

        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir el pdf', 'error');
      })

  }


}
