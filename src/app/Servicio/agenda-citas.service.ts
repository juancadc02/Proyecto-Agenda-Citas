import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Clientes } from '../Modelo/clientes';
import { Citas } from '../Modelo/citas';
import { AgendaCitas } from '../Modelo/agenda-citas';
import { Entrevistadores } from '../Modelo/entrevistadores';

@Injectable({
  providedIn: 'root'
})
//Servicio consultas agendaCitas
export class AgendaCitasService {

  constructor(private db: Firestore) { }


  //Metodo que añade una nueva agendaCita
  agregarAgendaCita(agendaCitas: AgendaCitas) {
    const agendaCitaRef = collection(this.db, 'agendaCitas');
    return addDoc(agendaCitaRef, agendaCitas);
  }
  //Metodo que modifica una agendaCita
  modificarAgendaCita(objeto: any, nombreColeccion: string, id: string) {
    const collectionRef = doc(this.db, nombreColeccion + "/" + id);
    return setDoc(collectionRef, objeto);
  }
  //Metodo que eliminar una agendaCita
  eliminarAgenda(objeto: any, nombreColeccion: string) {
    const collectionRef = doc(this.db, nombreColeccion + "/" + objeto.id);
    return deleteDoc(collectionRef);
  }
  //Metodo que devuelve la coleccion de todas las agendaCitas de firebase
  listarAgenda(): Observable<AgendaCitas[]> {
    const agendaRef = collection(this.db, 'agendaCitas')
    return collectionData(agendaRef, { idField: 'id' }) as Observable<AgendaCitas[]>
  }
  //Metodo que devuelve la coleccion de todos los entrevistadores de firebase
  listarEntrevistadores(): Observable<Entrevistadores[]> {
    const agendaRef = collection(this.db, 'entrevistadores')
    return collectionData(agendaRef, { idField: 'id' }) as Observable<Entrevistadores[]>
  }
  //Metodo que devuelve la coleccion de todos los clientes de firebase
  listarClientes(): Observable<Clientes[]> {
    const agendaRef = collection(this.db, 'clientes')
    return collectionData(agendaRef, { idField: 'id' }) as Observable<Clientes[]>
  }
  //Metodo que devuelve la coleccion de todos las citas de firebase
  listarCitas(): Observable<Citas[]> {
    const agendaRef = collection(this.db, 'citas')
    return collectionData(agendaRef, { idField: 'id' }) as Observable<Citas[]>
  }


}
