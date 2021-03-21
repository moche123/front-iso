import { Component } from '@angular/core';
import { Color } from 'ng2-charts';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  public  titulo = "Cantidad de publicaciones por escuela"
  public labels1: string[] = ['EPM', 'EPF', 'EPICI'];
  public data1 = [
    [10, 15, 40],
  ];

}
