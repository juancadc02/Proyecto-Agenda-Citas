import { Citas } from "./citas";
import { Clientes } from "./clientes";

export interface AgendaCitas{

    id?:string;
    nombreCliente:string;
    fechaAgenda:string;
    horaAgenda:string;
}