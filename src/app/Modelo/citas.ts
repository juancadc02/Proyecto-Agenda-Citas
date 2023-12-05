export interface Citas{
   
    id?: string;
    nombreEntrevistador:string,
    dia: Date;
    horaInicio: string;
    horaFin: string,
    presentado?: boolean
}