import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor() { }

  private mensajeSubject = new Subject<string>();
  mensaje$ = this.mensajeSubject.asObservable();

  enviarMensaje(mensaje: string) {
    this.mensajeSubject.next(mensaje);
  }
  obtenerMensaje(){
    return this.mensajeSubject.asObservable();
  }
}
