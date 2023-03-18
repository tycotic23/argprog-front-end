import { Component } from '@angular/core';
import { Contacto } from '../models/contacto';
import { ContactoService } from '../service/contacto.service';

@Component({
  selector: 'app-contacto-edit',
  templateUrl: './contacto-edit.component.html',
  styleUrls: ['./contacto-edit.component.css']
})
export class ContactoEditComponent {
  contactos: Contacto[]=[];
  newContacto:boolean=false;
  contactoCreatedError:string="";
  contactoMessage:string="";
  editContacto:boolean=false;
  editContactoSelected:string=""; //relacionado con el id

  //para crear el nuevo elemento, uno por cada propiedad del objeto
  newContactoRedsocial:string="";
  newContactoUrl:string="";
  newContactologourl:string="";
  newContactoTexto:string="";

  //para editar elemento, uno por cada propiedad del objeto
  editContactoRedsocial:string="";
  editContactoUrl:string="";
  editContactologourl:string="";
  editContactoTexto:string="";

 

  constructor(private contactoService:ContactoService){ }

  ngOnInit(){
    this.cargarContactos();
  }

  cargarContactos():void{
    this.contactoService.verTodos().subscribe(
      data=>{
        this.contactos=data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  //al tocarl el boton Nuevo Contacto
  onNewContacto():void{
      this.newContacto=!this.newContacto;
      this.contactoCreatedError= '';
      this.newContactoRedsocial="";
      this.newContactologourl="";
      this.newContactoTexto="";
      this.newContactoUrl="";
      this.contactoMessage="";
  }

  //al tocar el boton crear del elemento que aparece al crear nuevo Contacto
  onCreateContacto():void{  
    const contacto:Contacto=new Contacto (this.newContactoUrl,this.newContactoRedsocial,this.newContactologourl, this.newContactoTexto);
    this.contactoService.crear(contacto).subscribe(
      ()=>{
        this.contactoMessage= 'Creado correctamente';
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
        this.cargarContactos();
        this.newContacto=false;
      },
      err=>{
        this.contactoCreatedError= `No se puede crear. Error: ${err}`;
        setTimeout(()=>{
          this.contactoCreatedError="";
        },3000);
      }
    );
  }

  borrarContacto(contacto:string):void{
    this.contactoService.eliminar(contacto).subscribe(
      data=>{
        this.cargarContactos();
        this.contactoMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
      },
      err=>{
        this.contactoMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
      }
    );
  }

  showEditarContacto(contacto:Contacto):void{
    this.editContactoRedsocial=contacto.redsocial;
    this.editContactoUrl=contacto.url;
    this.editContactologourl=contacto.logourl;
    this.editContactoTexto=contacto.texto;
    this.editContacto=true;
    this.editContactoSelected=contacto.redsocial; //el id 
    this.contactoMessage='';
  }

  hiddenEditarContacto():void{
    this.editContactoRedsocial="";
    this.editContactoUrl="";
    this.editContactologourl="";
    this.editContactoTexto="";
    this.editContacto=false;
    this.editContactoSelected="";
  }

  editarContacto(contacto:string):void{   
    this.contactoService.editar(contacto,new Contacto(this.editContactoUrl,this.editContactoRedsocial,this.editContactologourl, this.editContactoTexto)).subscribe(
      data=>{
        this.contactoMessage="Editado correctamente";
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
        this.hiddenEditarContacto();
        this.cargarContactos();
      },
      err=>{
        this.contactoMessage=`No se puede editar. Error: ${err}`;
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
      }
    );
  }

  restoreContacto():void{
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
