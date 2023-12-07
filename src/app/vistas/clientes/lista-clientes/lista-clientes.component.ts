import { Component } from '@angular/core';
import { Clientes } from 'src/app/Modelo/clientes';
import { ClientesService } from 'src/app/Servicio/clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent {

  constructor(private servicioClientes: ClientesService){}

  clientes:Clientes[]=[];

  ngOnInit(){
    this.servicioClientes.listarClientes().subscribe(res =>this.clientes =res);
  }

  confirmarEliminar(clientes: Clientes) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el cliente con correo ${clientes.email}?`);
    if (confirmacion) {
      this.eliminarUsuario(clientes);
    }
  }
  eliminarUsuario(alquiler: Clientes) {
    this.servicioClientes.eliminarCliente(alquiler, "clientes");
  }

}
