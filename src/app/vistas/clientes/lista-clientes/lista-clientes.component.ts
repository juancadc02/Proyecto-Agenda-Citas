import { Component } from '@angular/core';
import { Clientes } from 'src/app/Modelo/clientes';
import { ClientesService } from 'src/app/Servicio/clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent {

  constructor(private servicioClientes: ClientesService) { }

  clientes: Clientes[] = [];

  //Cargamos el listado de cliente nada mas cargar.
  ngOnInit() {
    this.servicioClientes.listarClientes().subscribe(res => this.clientes = res);
  }

  //Metodo de confirmacion de eliminar un cliente.
  confirmarEliminar(clientes: Clientes) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el cliente con correo ${clientes.email}?`);
    if (confirmacion) {
      this.eliminarUsuario(clientes);
    }
  }
  //Metodo que elimina un cliente
  eliminarUsuario(cliente: Clientes) {
    //Llamamos al metodo de eliminar del servicioClientes.
    this.servicioClientes.eliminarCliente(cliente, "clientes");
  }

}
