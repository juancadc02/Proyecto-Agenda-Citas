import { Component } from '@angular/core';
import { AgendaCitas } from 'src/app/Modelo/agenda-citas';
import { AgendaCitasService } from 'src/app/Servicio/agenda-citas.service';

@Component({
  selector: 'app-lista-agenda',
  templateUrl: './lista-agenda.component.html',
  styleUrls: ['./lista-agenda.component.css']
})
export class ListaAgendaComponent {


  listaAgenda: AgendaCitas[] = [];

  constructor(private servicioAgenda: AgendaCitasService) { }

  //Cargamos el listado de agendaCitas nada mas cargar.
  ngOnInit() {
    this.servicioAgenda.listarAgenda().subscribe(res => this.listaAgenda = res);
  }
  //Metodo de confirmacion de eliminar una agendaCira.
  confirmarEliminar(agenda: AgendaCitas) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la cita con id: ${agenda.id}?`);
    if (confirmacion) {
      this.eliminarUsuario(agenda);
    }
  }
  //Metodo que elimina una agendaCita
  eliminarUsuario(agenda: AgendaCitas) {
    //Llamamos al metodo de eliminar del servicioAgendaCita.
    this.servicioAgenda.eliminarAgenda(agenda, "agendaCitas");
  }
}
