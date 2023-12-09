import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Servicio consultas mensaje
export class MensajeService {

  constructor() { }

  private mensajeSubject = new Subject<string>();
  mensaje$ = this.mensajeSubject.asObservable();
 
  //Metodo que muentra el mensaje
  enviarMensaje(mensaje: string) {
    this.mensajeSubject.next(mensaje);
  }
  //Metodo que obtiene el mensaje
  obtenerMensaje(){
    return this.mensajeSubject.asObservable();
  }
}
