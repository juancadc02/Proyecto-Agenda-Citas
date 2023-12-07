import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/Modelo/clientes';
import { ClientesService } from 'src/app/Servicio/clientes.service';
import { FirebaseService } from 'src/app/Servicio/firebase.service';
import { MensajeService } from 'src/app/Servicio/mensaje.service';

@Component({
  selector: 'app-detalle-clientes',
  templateUrl: './detalle-clientes.component.html',
  styleUrls: ['./detalle-clientes.component.css']
})
export class DetalleClientesComponent {

  //Variables 
  textoTitulo:string='Nuevo Cliente';
  buttonText:string='Añadir Cliente';
  mensaje:string='';
  clientesForm:FormGroup;
  clientes : Clientes={id:'',nombre:'',telefono:'',email:'',dni:''};
  id:string="";

  constructor( private fb: FormBuilder,
    private servicioClientes: ClientesService,
    private servicioMensaje: MensajeService,
    private route: ActivatedRoute,
    private router: Router,
    private servicioFirebase: FirebaseService){

    this.clientesForm=this.fb.group({
      nombre:['',Validators.required],
      telefono:['',Validators.required],
      email:['',Validators.required],
      dni:['',Validators.required]
    });
  }

ngOnInit(){
   // Comprobamos si estamos añadiendo o modificando.
   if (this.route.snapshot.paramMap.get("id")) {
    this.textoTitulo = 'Modificar cliente';
    this.id = this.route.snapshot.paramMap.get("id")!;
    this.buttonText = "Modificar cliente";
    this.servicioFirebase.getFireBasePorId('clientes', this.id).subscribe(
      (res: Clientes) => this.clientes = res
    );
  }

  this.servicioMensaje.mensaje$.subscribe((mensaje) => {
    if (mensaje) {
      this.mensaje = mensaje;
    }
  });
}
  enviarDatos(){

    if(this.id){
      this.modificarCliente();
    }else{
      this.agregarCliente();
    }

  }

  agregarCliente(){
    if (this.clientesForm.valid) {
      const nuevoCliente = this.clientesForm.value;
      this.servicioClientes.añadirCliente(nuevoCliente)
        .then(() => {
          console.log('Cliente agregado correctamente');
          this.clientesForm.reset();
          this.servicioMensaje.enviarMensaje('Cliente añadido correctamente.Redirigiendo a listado de clientes ...');
          //Redirigimos al listado de juegos 2 segundos despues de añadirlo.
          setTimeout(() => {
            // Redirigir a otro sitio
            this.router.navigate(['/clientes']);
          }, 2000)
        })
        .catch(error => {
          console.error('Error al agregar el juego:', error);
        });
    }
  }
  modificarCliente(){
    this.servicioClientes.modificarCliente(this.clientes, 'clientes', this.id!).
    then(() => console.log("Se guardo correctamente")).
    catch(() => console.log("No se guardo"));
    this.servicioMensaje.enviarMensaje('Cliente modificado correctamente. Redirigiendo a listado de clientes ...');
    //Redirigimos al listado de juegos 2 segundos despues de añadirlo.
    setTimeout(() => {
     // Redirigir a otro sitio
     this.router.navigate(['/clientes']);
   }, 2000)
  }
}
