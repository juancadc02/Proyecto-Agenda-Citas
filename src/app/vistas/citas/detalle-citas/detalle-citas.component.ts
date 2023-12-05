import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Citas } from 'src/app/Modelo/citas';
import { CitasService } from 'src/app/Servicio/citas.service';
import { MensajeService } from 'src/app/Servicio/mensaje.service';

@Component({
  selector: 'app-detalle-citas',
  templateUrl: './detalle-citas.component.html',
  styleUrls: ['./detalle-citas.component.css']
})
export class DetalleCitasComponent {


  //Campos necesarios.
  citaForm:FormGroup;
  textoTitulo:string="Añadir Cita";
  buttonText='Guardar Cita'
  mensaje?:string;
  cita : Citas={id:'',nombreEntrevistador:'',dia:new Date(),horaInicio:'',horaFin:'',presentado:false};


  constructor(private router: Router,
    private servicioCitas : CitasService,
    private servicioMensaje :MensajeService,
    private forms: FormBuilder){


      this.citaForm = this.forms.group({
        nombreEntrevistador: ['', Validators.required],
        dia: [new Date().toISOString().split('T')[0], Validators.required],
        horaInicio: ['', Validators.required],
        horaFin: ['', Validators.required],
        presentado: [null],
      });


    }
 
    ngOnInit(){
      // Para mostrar el mensaje una vez añadido el alquiler
    this.servicioMensaje.mensaje$.subscribe((mensaje) => {
      if (mensaje) {
        this.mensaje = mensaje;
      }
    });
    }
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
}
