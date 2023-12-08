import { Component } from '@angular/core';
import { AgendaCitas } from 'src/app/Modelo/agenda-citas';
import { AgendaCitasService } from 'src/app/Servicio/agenda-citas.service';

@Component({
  selector: 'app-lista-agenda',
  templateUrl: './lista-agenda.component.html',
  styleUrls: ['./lista-agenda.component.css']
})
export class ListaAgendaComponent {


  listaAgenda:AgendaCitas[]=[];

  constructor(private servicioAgenda: AgendaCitasService){}

 
  ngOnInit(){

    this.servicioAgenda.listarAgenda().subscribe(res => this.listaAgenda = res);
  }

  confirmarEliminar(agenda: AgendaCitas) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la cita con id: ${agenda.id}?`);
    if (confirmacion) {
      this.eliminarUsuario(agenda);
    }
  }
  eliminarUsuario(agenda: AgendaCitas) {
    this.servicioAgenda.eliminarAgenda(agenda, "agendaCitas");
  }
}
