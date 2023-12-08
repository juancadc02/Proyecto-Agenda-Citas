import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { ClientesComponent } from './vistas/clientes/clientes.component';
import { CitasComponent } from './vistas/citas/citas.component';
import { AgendaDiariaComponent } from './vistas/agenda-diaria/agenda-diaria.component';
import { DetalleCitasComponent } from './vistas/citas/detalle-citas/detalle-citas.component';
import { DetalleClientesComponent } from './vistas/clientes/detalle-clientes/detalle-clientes.component';
import { DetalleAgendaComponent } from './vistas/agenda-diaria/detalle-agenda/detalle-agenda.component';

const routes: Routes = [
  {path:'',component:PaginaInicioComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'clientes/nuevo',component:DetalleClientesComponent},
  {path:'clientes/:id',component:DetalleClientesComponent},
  {path:'citas',component:CitasComponent},
  {path:'citas/nuevo',component:DetalleCitasComponent},
  {path:'citas/:id',component:DetalleCitasComponent},
  {path:'agenda' , component:AgendaDiariaComponent},
  {path:'agenda/nuevo' , component:DetalleAgendaComponent},
  {path:'agenda/:id' , component:DetalleAgendaComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
