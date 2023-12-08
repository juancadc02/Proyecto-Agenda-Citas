import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendaCitas } from 'src/app/Modelo/agenda-citas';
import { Citas } from 'src/app/Modelo/citas';
import { Clientes } from 'src/app/Modelo/clientes';
import { AgendaCitasService } from 'src/app/Servicio/agenda-citas.service';
import { MensajeService } from 'src/app/Servicio/mensaje.service';

@Component({
  selector: 'app-detalle-agenda',
  templateUrl: './detalle-agenda.component.html',
  styleUrls: ['./detalle-agenda.component.css']
})
export class DetalleAgendaComponent {

  textoTitulo: string = 'Añadir Cita Agenda';
  buttonText: string = 'Añadir Cita Agenda';
  mensaje: string = '';
  id:string='';
  agenda: FormGroup;
  agendaCitas: AgendaCitas = {id:'',nombreCliente: '', fechaAgenda: '', horaAgenda: '' };
  nombreClienteAgenda:AgendaCitas[]=[];
  nombreClientes: Clientes[] = [];
  fechaCita: Citas[] = [];
  fechaCitaHora:Citas[]=[];

  constructor(private fb: FormBuilder,
    private servicioAgenda: AgendaCitasService,
    private servicioMensaje: MensajeService,
    private router:Router) {
    this.agenda = this.fb.group({
      nombreCliente: ['',Validators.required],
      fechaAgenda:['',Validators.required],
      horaAgenda:['',Validators.required]
     
    });
  }

  ngOnInit() {
    this.servicioAgenda.listarClientes().subscribe(res => this.nombreClientes = res);
    this.servicioAgenda.listarCitas().subscribe(res => {
      this.fechaCita = res;
      this.filtrarFechasDuplicadas();
    });
    this.servicioAgenda.listarCitas().subscribe(res => this.fechaCitaHora = res);
    // Para mostrar el mensaje una vez añadido el alquiler
    this.servicioMensaje.mensaje$.subscribe((mensaje) => {
      if (mensaje) {
        this.mensaje = mensaje;
      }
    });
  }
  
  enviarDatos() {
    if(this.id){
      this.modificarCitaAgenda();
    }else{
      this.añadirCita();
    }
  }

  modificarCitaAgenda(){
    this.servicioAgenda.modificarAgendaCita(this.agendaCitas, 'agendaCitas', this.id!).
    then(() => console.log("Se guardo correctamente")).
    catch(() => console.log("No se guardo"));
    this.servicioMensaje.enviarMensaje('Cita modificada correctamente. Redirigiendo a listado de citas ...');
    //Redirigimos al listado de juegos 2 segundos despues de añadirlo.
    setTimeout(() => {
     // Redirigir a otro sitio
     this.router.navigate(['/agenda']);
   }, 2000)
  }

  añadirCita(){
    console.log(this.agenda.valid);
    if (this.agenda.valid) {
      const nuevaCitaAgenda = this.agenda.value;
      this.servicioAgenda.agregarAgendaCita(nuevaCitaAgenda)
        .then(() => {
          console.log('CitaAgenda agregada correctamente');
          this.agenda.reset();
          this.servicioMensaje.enviarMensaje('CitaAgenda añadida correctamente.Redirigiendo a listado de agendaCitas ...');
          //Redirigimos al listado de juegos 2 segundos despues de añadirlo.
          setTimeout(() => {
            // Redirigir a otro sitio
            this.router.navigate(['/agenda']);
          }, 2000)
        })
        .catch(error => {
          console.error('Error al agregar la cita:', error);
        });
    }
  }

  filtrarFechasDuplicadas() {
    const fechasUnicas = this.fechaCita.filter(
      (valor, indice, self) =>
        self.findIndex((item) => item.dia === valor.dia) === indice
    );
    this.fechaCita = fechasUnicas;
  }
}
