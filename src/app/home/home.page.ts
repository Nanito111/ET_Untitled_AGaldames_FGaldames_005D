import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  scannedCode:string | null = null;  

  constructor(public app: AppComponent, private router: Router,
              private barcodeScanner : BarcodeScanner) {}

  ngOnInit(): void {
  }

  ionViewWillEnter(){
    const header = document.getElementById('header');
    const btnQR = document.getElementById('qr');
    const txtqr = document.getElementById('txt-qr');
    const version = document.getElementById('version');
    const txtfuncion = document.getElementById('funcion');


    if (localStorage.getItem('type') == 'true') {
      header?.classList.add('header-alumno');
      btnQR?.classList.add('btn-qr-alumno');
      txtqr?.classList.add('txt-qr-alumno');
      txtfuncion!.innerHTML = 'ESCANEAR';
    } else {
      header?.classList.add('header-docente');
      btnQR?.classList.add('btn-qr-docente');
      txtqr?.classList.add('txt-qr-docente');
      txtfuncion!.innerHTML = 'GENERAR';
    }

    version!.innerHTML = localStorage.getItem('user') == null ? '' : localStorage.getItem('user')!.toUpperCase();
  }

  qrButton(){
    if (localStorage.getItem('type') == 'true') {
      this.scanCode();
    } else {
      this.router.navigate(['/generar-qr']);
    }
  }

  scanCode(){
    this.barcodeScanner.scan().then(data=>{
      this.scannedCode = data.text;
      console.log(this.scannedCode);
    })
  }
}
