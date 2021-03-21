import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { EscuelaService } from 'src/app/services/escuela.service';

import { ReportesService } from '../../services/reportes.service';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})

export class DonaComponent {
  public escuelas = []
  constructor(
    private escuelaService:EscuelaService,

    private reporteService:ReportesService
  ){
    this.cargarEscuelas()

  }

  @Input() title: string = 'Sin titulo';
  @Input() Info:number[] = [];
  @Input('labels') doughnutChartLabels: Label[] = ['A','B','C','D','E'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [20, 20, 20, 20, 20],
  ];


  public colors: Color[] = [
    { backgroundColor: [ '#6857E6','#009FEE','#F02059','#1AFF1A',' #FFFF1A'] }
  ];
  cargarEscuelas(){

    this.escuelaService.cargarEscuelas()
    .subscribe( (escue:string[]) => {

      this.escuelas = escue;
      this.doughnutChartLabels = this.escuelas
      console.log(this.doughnutChartLabels)
      this.cargarCantidad()
    },err => console.log(err))

  }
  cargarCantidad(){
    let arrayprueba = [];
    this.escuelas.forEach((elemento:any)=>{

      this.reporteService.getEscuelas(elemento)
        .subscribe((r:any) => {
          arrayprueba[this.doughnutChartLabels.indexOf(elemento)] = r.resultado.length
          if(arrayprueba.length == this.escuelas.length){
            this.asignarCantidades(arrayprueba)
          }
      })
    })

  }
  asignarCantidades(arrayprueba){
    setTimeout(() => {
      this.doughnutChartData = arrayprueba;
    }, 100);


  }
}
