import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { AsistenciaService, IClase, IAsignatura } from '../services/asistencia.service';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {


  asignaturas: any;
  clases: any;
  constructor(public app: AppComponent, private asistencia: AsistenciaService) {}

  ngOnInit() {
    this.app.loading('show');
  }

  ionViewWillEnter(){
    // GET de ASIGNATURAS
    this.asistencia.listarAsignaturas()
    .pipe(
      finalize(async () => {
        this.app.loading('hide');
      })
    )
    .subscribe(data => {
      this.asignaturas = data;
    });

    // GET de CLASES
    this.asistencia.listarClases()
    .pipe(
      finalize(async () => {
        this.app.loading('hide');
      })
    )
    .subscribe(data => {
      this.clases = data;
    });
  }

}
