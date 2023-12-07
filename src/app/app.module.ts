import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MenuComponent } from './core/menu/menu.component';
import { AgendaDiariaComponent } from './vistas/agenda-diaria/agenda-diaria.component';
import { CitasComponent } from './vistas/citas/citas.component';
import { ClientesComponent } from './vistas/clientes/clientes.component';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalleCitasComponent } from './vistas/citas/detalle-citas/detalle-citas.component';
import { ListaCitasComponent } from './vistas/citas/lista-citas/lista-citas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleClientesComponent } from './vistas/clientes/detalle-clientes/detalle-clientes.component';
import { ListaClientesComponent } from './vistas/clientes/lista-clientes/lista-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AgendaDiariaComponent,
    CitasComponent,
    ClientesComponent,
    PaginaInicioComponent,
    DetalleCitasComponent,
    ListaCitasComponent,
    DetalleClientesComponent,
    ListaClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"proyecto-agenda-444d7","appId":"1:530152701214:web:7e318226a9b94ef0005d0f","storageBucket":"proyecto-agenda-444d7.appspot.com","apiKey":"AIzaSyBPnzpOZYaiaQWZ6zvo-eXmv5cz2-N-4O8","authDomain":"proyecto-agenda-444d7.firebaseapp.com","messagingSenderId":"530152701214","measurementId":"G-VXZSELYME1"})),
    provideFirestore(() => getFirestore()),
    NgbModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
