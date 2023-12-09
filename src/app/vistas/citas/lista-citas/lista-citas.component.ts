import { Component } from '@angular/core';
import { Citas } from 'src/app/Modelo/citas';
import { CitasService } from 'src/app/Servicio/citas.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent {

  citas: Citas[] = [];

  constructor(private servicioCitas: CitasService) { }

  //Cargamos el listado de citas nada mas cargar.
  ngOnInit() {
    this.servicioCitas.listarCitas().subscribe(res => this.citas = res);
  }
  //Metodo de confirmacion de eliminar una cita.
  confirmarEliminar(citas: Citas) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la cita con id: ${citas.id}?`);
    if (confirmacion) {
      this.eliminarUsuario(citas);
    }
  }
  //Metodo que elimina una cita
  eliminarUsuario(cita: Citas) {
    //Llamamos al metodo de eliminar del servicioCitas.
    this.servicioCitas.eliminarCita(cita, "citas");
  }
}
