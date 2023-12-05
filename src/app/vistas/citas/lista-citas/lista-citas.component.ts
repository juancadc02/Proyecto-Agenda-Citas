import { Component } from '@angular/core';
import { Citas } from 'src/app/Modelo/citas';
import { CitasService } from 'src/app/Servicio/citas.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent {

  citas :Citas[]=[];

  constructor(private servicioCitas :CitasService){}
 
  ngOnInit(){
    this.servicioCitas.listarCitas().subscribe(res =>this.citas =res);
  }

  confirmarEliminar(citas: Citas) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la cita con id: ${citas.id}?`);
    if (confirmacion) {
      this.eliminarUsuario(citas);
    }
  }
  eliminarUsuario(cita: Citas) {
    this.servicioCitas.eliminarCita(cita, "citas");
  }
}
