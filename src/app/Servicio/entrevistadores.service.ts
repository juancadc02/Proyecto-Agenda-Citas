import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Entrevistadores } from '../Modelo/entrevistadores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrevistadoresService {

  constructor(private db : Firestore) { }


  listarEntrevistadores() : Observable <Entrevistadores[]>{
    const entrevistadoresRef =collection(this.db,'entrevistadores')
    return collectionData(entrevistadoresRef,{idField:'id'}) as Observable<Entrevistadores[]>
  }
}
