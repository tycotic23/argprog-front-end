import { Component } from '@angular/core';
import { Contacto } from '../models/contacto';
import { ContactoService } from '../service/contacto.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contactos: Contacto[]=[];
  contactoMessage:string="";

  constructor(private contactoService:ContactoService){ }

  ngOnInit(){
    this.cargarContactos();
  }

  cargarContactos():void{
    this.contactoMessage="Cargando...";
    this.contactoService.verTodos().subscribe(
      data=>{
        this.contactos=data;
        this.contactoMessage= '';
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
         //si esta vacio debe ser restaurado
         if(data.length==0){
          this.restoreContacto();
        }
      },
      err=>{
        console.log(err);
        this.contactoMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
      }
    );
  }

  restoreContacto():void{
    this.contactoMessage="Cargando...";
    this.contactoService.restaurar().subscribe(
      ()=>{
        this.contactoMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
        this.cargarContactos();
      },
      err=>{
        this.contactoMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
      }
    );
  }

}
