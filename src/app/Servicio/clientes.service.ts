import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Clientes } from '../Modelo/clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private db :Firestore) { }


  añadirCliente(cliente:Clientes){
    const clienteRef =collection(this.db,'clientes');
    return addDoc(clienteRef,cliente);
  }
  modificarCliente(objeto: any, nombreColeccion: string, id: string) {
    const collectionRef = doc(this.db, nombreColeccion+"/"+id);
    return setDoc(collectionRef, objeto);
  }
  listarClientes() : Observable <Clientes[]>{
    const agendaRef =collection(this.db,'clientes')
    return collectionData(agendaRef,{idField:'id'}) as Observable<Clientes[]>
  }
  eliminarCliente(objeto: any, nombreColeccion: string){
    const collectionRef = doc(this.db, nombreColeccion+"/"+objeto.id);
    return deleteDoc(collectionRef);
  }

}
