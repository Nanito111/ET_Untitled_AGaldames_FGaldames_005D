import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

export interface IAsignatura {
  id:string,
  nombre: string,
}

export interface IClase {
  id:string,
  seccion: string,
  fecha: string,
  horaInicio: string,
  horaTermino: string,
  asignaturaId:string,
  asistencia: string[]
}


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http: HttpClient) { }

  listarAsignaturas(){
    return this.http.get<IAsignatura>(`${environment.apiURL}asignaturas`);
  }

  listarClases(){
    return this.http.get<IClase>(`${environment.apiURL}clases`);
  }

  crearClase(newClase: IClase){
    return this.http.post<IClase>(`${environment.apiURL}clases`,newClase)
  }

  getAsistencia(claseId: string){
    return this.http.get<any>(`${environment.apiURL}clases/${claseId}`);
  }

  addAlumnoToClase(claseId: string, newValue: []){
    console.log("inicio patch")
    // return objeto;
    this.http.patch(`${environment.apiURL}clases/${claseId}`,
    {"asistencia": newValue})
    .subscribe();
  }

}
//#region CR7

/*
EL BICHO⠀⠀⠀⣴⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⠂⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣦⠀
⠀⠀⠀⠀⠀⠀⣴⣿⢿⣷⠒⠲⣾⣾⣿⣿
⠀⠀⠀⠀⣴⣿⠟⠁⠀⢿⣿⠁⣿⣿⣿⠻⣿⣄⠀⠀⠀⠀
⠀⠀⣠⡾⠟⠁⠀⠀⠀⢸⣿⣸⣿⣿⣿⣆⠙⢿⣷⡀⠀⠀
⣰⡿⠋⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⠀⠀⠉⠻⣿⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣆⠂⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⡿⣿⣿⣿⣿⡄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⠿⠟⠀⠀⠻⣿⣿⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣾⡿⠃⠀⠀⠀⠀⠀⠘⢿⣿⡀⠀⠀⠀
⠀⠀⠀⠀⠀⣰⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣷⡀⠀⠀
⠀⠀⠀⠀⢠⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣧⠀⠀
⠀⠀⠀⢀⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣆⠀
⠀⠀⠠⢾⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣷⡤⠄
¡SIIUUUUUUUUUUUUU!
*/

//#endregion