import { Citas } from "./citas";
import { Clientes } from "./clientes";

//Modelo de datos de la coleccion AgendaCitas
export interface AgendaCitas{

    id?:string;
    nombreEntrevistador:string;
    nombreCliente:string;
    fechaAgenda:string;
    horaAgenda:string;
}