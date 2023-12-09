import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Citas } from '../Modelo/citas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Servicio consultas citas
export class CitasService {

  constructor(private db: Firestore) { }

  //Metodo que agregas citas a la coleccion citas de firebase 
  agregarCita(cita: Citas) {
    const citaRef = collection(this.db, `citas`);
    return addDoc(citaRef, cita);
  }
  //Metodo que elimina citas a la coleccion citas de firebase 
  eliminarCita(objeto: any, nombreColeccion: string) {
    const collectionRef = doc(this.db, nombreColeccion + "/" + objeto.id);
    return deleteDoc(collectionRef);
  }
  //Metodo que medifica citas a la coleccion citas de firebase 

  modificarCitas(objeto: any, nombreColeccion: string, id: string) {
    const collectionRef = doc(this.db, nombreColeccion + "/" + id);
    return setDoc(collectionRef, objeto);
  }
  //Metodo que devuelve una coleccion de citas de firebase
  listarCitas(): Observable<Citas[]> {
    const agendaRef = collection(this.db, 'citas')
    return collectionData(agendaRef, { idField: 'id' }) as Observable<Citas[]>
  }
}
