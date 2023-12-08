import { Component } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
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
  mensajeError:string='';
  id:string='';
  esExito:boolean=true;
  agenda: FormGroup;
  agendaCitas: AgendaCitas = {id:'',nombreCliente: '', fechaAgenda: '', horaAgenda: '' };
  nombreClienteAgenda:AgendaCitas[]=[];
  nombreClientes: Clientes[] = [];
  fechaCita: Citas[] = [];
  fechaCitaHora:Citas[]=[];

  constructor(private fb: FormBuilder,
    private servicioAgenda: AgendaCitasService,
    private servicioMensaje: MensajeService,
    private router:Router,
    private db :Firestore) {
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
    if (this.id) {
      this.modificarCitaAgenda();
    } else {
      // Verificar si ya existe una cita en Firestore con los mismos datos
      this
        .verificarCitaExistenteEnFirestore(
          this.agendaCitas.nombreCliente,
          this.agendaCitas.fechaAgenda,
          this.agendaCitas.horaAgenda
        )
        .then((existeCita) => {
          if (existeCita) {
            // Mostrar mensaje de error al usuario
            this.esExito = false;
            console.log("Despues de que se repita la fecha"+this.esExito)
            this.mensaje = 'Ya existe una cita con el mismo cliente, fecha y hora.';
          } else {
            // No existe la cita, proceder a añadir
            this.añadirCita();
            console.log("despues de añadir la cita"+this.esExito);
            this.esExito;
          }
        })
        .catch((error) => {
          console.error('Error al verificar la existencia de la cita en Firestore:', error);
        });
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
          this.esExito = true;
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
  verificarCitaExistenteEnFirestore(nombreCliente: string, fechaAgenda: string, horaAgenda: string): Promise<boolean> {
    const citasRef = collection(this.db, 'agendaCitas'); // Reemplaza 'citas' con el nombre de tu colección
    const q = query(citasRef, where('nombreCliente', '==', nombreCliente), where('fechaAgenda', '==', fechaAgenda), where('horaAgenda', '==', horaAgenda));
  
    return getDocs(q).then((querySnapshot) => {
      return !querySnapshot.empty;
    });
  }
  
  //Para que salgan las horas disable
  /*esHoraOcupada(hora: string): Promise<boolean> {
  const citasRef = collection(this.firestore, 'citas'); // Reemplaza 'citas' con el nombre de tu colección

  const q = query(
    citasRef,
    where('fechaAgenda', '==', this.agendaCitas.fechaAgenda),
    where('horaAgenda', '==', hora)
  );

  return new Promise((resolve, reject) => {
    getDocs(q)
      .then((querySnapshot) => {
        resolve(!querySnapshot.empty);
      })
      .catch((error) => {
        console.error('Error al verificar la existencia de la cita en Firestore:', error);
        reject(error);
      });
  });*/
  

}