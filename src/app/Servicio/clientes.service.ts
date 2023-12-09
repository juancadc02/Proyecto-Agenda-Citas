import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Clientes } from '../Modelo/clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Servicio consultas clientes
export class ClientesService {

  constructor(private db: Firestore) { }


  //Metodo que añade un nuevo cliente a la collecion clientes en firebase
  añadirCliente(cliente: Clientes) {
    const clienteRef = collection(this.db, 'clientes');
    return addDoc(clienteRef, cliente);
  }
  //Metodo que modifica un cliente a la collecion clientes en firebase
  modificarCliente(objeto: any, nombreColeccion: string, id: string) {
    const collectionRef = doc(this.db, nombreColeccion + "/" + id);
    return setDoc(collectionRef, objeto);
  }
  //Metodo que elimina un cliente a la collecion clientes en firebase

  eliminarCliente(objeto: any, nombreColeccion: string) {
    const collectionRef = doc(this.db, nombreColeccion + "/" + objeto.id);
    return deleteDoc(collectionRef);
  }
  //Metodo que devuelve una coleccion de cliente de firebase
  listarClientes(): Observable<Clientes[]> {
    const agendaRef = collection(this.db, 'clientes')
    return collectionData(agendaRef, { idField: 'id' }) as Observable<Clientes[]>
  }

}
