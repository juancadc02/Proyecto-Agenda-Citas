import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { ClientesComponent } from './vistas/clientes/clientes.component';
import { CitasComponent } from './vistas/citas/citas.component';
import { AgendaDiariaComponent } from './vistas/agenda-diaria/agenda-diaria.component';
import { DetalleCitasComponent } from './vistas/citas/detalle-citas/detalle-citas.component';

const routes: Routes = [
  {path:'',component:PaginaInicioComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'citas',component:CitasComponent},
  {path:'citas/nuevo',component:DetalleCitasComponent},
  {path:'agenda' , component:AgendaDiariaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
