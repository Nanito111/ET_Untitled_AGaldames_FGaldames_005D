import { Component, OnInit } from '@angular/core';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { IonModal} from '@ionic/angular';

import { AppComponent } from '../app.component';
import { AsistenciaService, IClase } from '../services/asistencia.service';

import { finalize } from 'rxjs/internal/operators/finalize';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  scannedCode:string | null = null;
  createdCode:string | null = null;
  canCreateQr:boolean = false;
  isAlumno: string | null = localStorage.getItem('type');
  asignaturas: any;

  constructor(public app: AppComponent,
              private barcodeScanner : BarcodeScanner,
              private asistencia : AsistenciaService,
              ) {}

  ngOnInit(): void {
    console.log("ayuda");
  }

  ionViewWillEnter(){
    const header = document.getElementById('header');
    const version = document.getElementById('version');

    if (localStorage.getItem('type') == 'true') {
      header?.classList.add('header-alumno');
    } else {
      header?.classList.add('header-docente');

      if (localStorage.getItem('claseCreada')) {
        this.canCreateQr = false;
        this.createdCode = localStorage.getItem('claseCreada');
      }else{
        this.canCreateQr = true;
      }
    }

    version!.innerHTML = localStorage.getItem('user') == null ? '' : localStorage.getItem('user')!.toUpperCase();
  }

  qrButton(){
    if (localStorage.getItem('type') == 'true') {
      this.scanCode();
    }
  }

  scanCode(){
    this.barcodeScanner.scan().then(data=>{
      this.scannedCode = data.text;
      console.log(this.scannedCode);
    })

    // PATCH de ALUMNO
    this.asistencia.getAsistencia(this.scannedCode!)
    .subscribe(data => {
      let lista = data["asistencia"];
      lista.push(localStorage.getItem('userId'));
      this.asistencia.addAlumnoToClase(this.scannedCode!, lista);
    });

  }

  informacion: IClase = {
    id:'',
    seccion:'',
    fecha:'',
    horaInicio:'',
    horaTermino:'',
    asignaturaId: '',
    asistencia: []
  }

  openingModalQr(){
    this.app.loading('show');
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
  }

  closeModalQr(modal: IonModal){
    modal.dismiss();
  }

  createCode(modal: IonModal){
    console.log('Submit');
    this.closeModalQr(modal);
    
    this.informacion.id = 
      this.informacion.asignaturaId + "-" + this.informacion.seccion + "." +
      this.informacion.fecha + "." +
      this.informacion.horaInicio + "." +
      this.informacion.horaTermino;

    this.createdCode = this.informacion.id;

    localStorage.setItem('claseCreada', this.createdCode);

    this.canCreateQr = false;
    
    this.asistencia.crearClase(this.informacion).subscribe();
  }

  terminarClase(){
    this.createdCode = null;
    localStorage.removeItem('claseCreada');
    this.canCreateQr = true;
  }

  
}
