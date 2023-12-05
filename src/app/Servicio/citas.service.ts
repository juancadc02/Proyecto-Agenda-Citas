import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Citas } from '../Modelo/citas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private db :Firestore) { }



  agregarCita(cita:Citas){
    const citaRef =collection(this.db,`citas`);
    return addDoc(citaRef,cita);
  }
  listarCitas() : Observable <Citas[]>{
    const agendaRef =collection(this.db,'citas')
    return collectionData(agendaRef,{idField:'id'}) as Observable<Citas[]>
  }
  eliminarCita(objeto: any, nombreColeccion: string){
    const collectionRef = doc(this.db, nombreColeccion+"/"+objeto.id);
    return deleteDoc(collectionRef);
  }
}
