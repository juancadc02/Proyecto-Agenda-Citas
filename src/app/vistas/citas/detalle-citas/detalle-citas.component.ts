import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Citas } from 'src/app/Modelo/citas';
import { Entrevistadores } from 'src/app/Modelo/entrevistadores';
import { CitasService } from 'src/app/Servicio/citas.service';
import { EntrevistadoresService } from 'src/app/Servicio/entrevistadores.service';
import { FirebaseService } from 'src/app/Servicio/firebase.service';
import { MensajeService } from 'src/app/Servicio/mensaje.service';

@Component({
  selector: 'app-detalle-citas',
  templateUrl: './detalle-citas.component.html',
  styleUrls: ['./detalle-citas.component.css']
})
export class DetalleCitasComponent {


  //Campos necesarios.
  citaForm: FormGroup;
  textoTitulo: string = "Añadir Cita";
  buttonText = 'Guardar Cita'
  mensaje?: string;
  id: string = "";
  entrevistadores: Entrevistadores = { id: '', nombreEntrevistador: '' };
  entrevistadoresNombre: Entrevistadores[] = [];
  cita: Citas = { id: '', nombreEntrevistador: '', dia: '', horaInicio: '', horaFin: '', presentado: false };


  constructor(private router: Router,
    private servicioCitas: CitasService,
    private servicioMensaje: MensajeService,
    private forms: FormBuilder,
    private servicioEntrevistadores: EntrevistadoresService,
    private servicioFirebase: FirebaseService,
    private route: ActivatedRoute) {


    this.citaForm = this.forms.group({
      nombreEntrevistador: ['', Validators.required],
      dia: [new Date().toISOString().split('T')[0], Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      presentado: [null],
    });


  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get("id")) {
      this.textoTitulo = 'Modificar cita';
      this.id = this.route.snapshot.paramMap.get("id")!;
      this.buttonText = "Modificar cita";
      this.servicioFirebase.getFireBasePorId('citas', this.id).subscribe(
        (res: any) => this.cita = res);
    }
    this.servicioEntrevistadores.listarEntrevistadores().subscribe(res => this.entrevistadoresNombre = res);
    // Para mostrar el mensaje una vez añadido el alquiler
    this.servicioMensaje.mensaje$.subscribe((mensaje) => {
      if (mensaje) {
        this.mensaje = mensaje;
      }
    });
  }

    //Metodo que si recibe algun id de citas modifica la cita y si no crea una nueva cita
  enviarDatos() {
    if (this.id) {
      this.modificarCita()
    } else {
      this.agregarCita();
    }
  }
    //Metodo que añade una cita,muestra mensaje y redirige a la pagina citas
  agregarCita() {
    console.log(this.citaForm.valid);
    if (this.citaForm.valid) {
      const nuevaCita = this.citaForm.value;
      this.servicioCitas.agregarCita(nuevaCita)
        .then(() => {
          console.log('Cita agregado correctamente');
          this.citaForm.reset();
          this.servicioMensaje.enviarMensaje('Cita añadida correctamente.Redirigiendo a listado de citas ...');
          //Redirigimos al listado de juegos 2 segundos despues de añadirlo.
          setTimeout(() => {
            // Redirigir a otro sitio
            this.router.navigate(['/citas']);
          }, 2000)
        })
        .catch(error => {
          console.error('Error al agregar la cita:', error);
        });
    }
  }

  //Metodo que modifica una cita,muestra mensaje y redirige a la pagina citas
  modificarCita() {
    this.servicioCitas.modificarCitas(this.cita, 'citas', this.id!).
      then(() => console.log("Se guardo correctamente")).
      catch(() => console.log("No se guardo"));
    this.servicioMensaje.enviarMensaje('Cita modificada correctamente. Redirigiendo a listado de citas ...');
    //Redirigimos al listado de juegos 2 segundos despues de añadirlo.
    setTimeout(() => {
      // Redirigir a otro sitio
      this.router.navigate(['/citas']);
    }, 2000)
  }
}

