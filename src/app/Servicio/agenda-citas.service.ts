import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Clientes } from '../Modelo/clientes';
import { Citas } from '../Modelo/citas';
import { AgendaCitas } from '../Modelo/agenda-citas';

@Injectable({
  providedIn: 'root'
})
export class AgendaCitasService {

  constructor(private db : Firestore) { }



  listarClientes() : Observable <Clientes[]>{
    const agendaRef =collection(this.db,'clientes')
    return collectionData(agendaRef,{idField:'id'}) as Observable<Clientes[]>
  }
  listarCitas() : Observable <Citas[]>{
    const agendaRef =collection(this.db,'citas')
    return collectionData(agendaRef,{idField:'id'}) as Observable<Citas[]>
  }
  agregarAgendaCita(agendaCitas:AgendaCitas){
    const agendaCitaRef=collection(this.db,'agendaCitas');
    return addDoc(agendaCitaRef,agendaCitas);
  }
  modificarAgendaCita(objeto: any, nombreColeccion: string, id: string) {
    const collectionRef = doc(this.db, nombreColeccion+"/"+id);
    return setDoc(collectionRef, objeto);
  }
  listarAgenda() : Observable <AgendaCitas[]>{
    const agendaRef =collection(this.db,'agendaCitas')
    return collectionData(agendaRef,{idField:'id'}) as Observable<AgendaCitas[]>
  }
  eliminarAgenda(objeto: any, nombreColeccion: string){
    const collectionRef = doc(this.db, nombreColeccion+"/"+objeto.id);
    return deleteDoc(collectionRef);
  }


}
