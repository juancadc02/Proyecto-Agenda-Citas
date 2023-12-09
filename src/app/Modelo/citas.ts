//Modelo de datos de la coleccion Citas
export interface Citas{
   
    id?: string;
    nombreEntrevistador:string,
    dia: string;
    horaInicio: string;
    horaFin: string,
    presentado?: boolean
}