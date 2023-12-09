import { Citas } from "./citas";
//Modelo de datos de la coleccion clientes
export interface Clientes{
  
    id?:string;
    nombre:string;
    telefono:string;
    email:string;
    dni:string;
    citas?:Citas[];
}