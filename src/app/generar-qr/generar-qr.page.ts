import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {

  createdCode:string | null = null;
  // scannedCode = null;

  informacion={
    Seccion:'',
    Fecha:'',
    HoraInicio:'',
    HoraTermino:''
  }

  constructor() { }

  ngOnInit() {
  }

  createCode(){
    console.log('Submit');
    this.createdCode = JSON.stringify(this.informacion);
  }

  // scanCode(){
  //   this.barcodeScanner.scan().then(data=>{
  //     this.scannedCode = data.text;
  //   })
  // }
  

}