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
  enProceso:boolean=false;
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
    this.contactoMessage="Espere mientras cargan los datos, puede demorar";
    this.contactoService.verTodos().subscribe(
      data=>{
        this.contactos=data;
        this.contactoMessage= '';
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
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
    if(this.newContactoUrl=="" || this.newContactoRedsocial=="" || this.newContactologourl=="" ||
     this.newContactoUrl.length>100 || this.newContactoRedsocial.length>20 || this.newContactologourl.length>100 || this.newContactoTexto.length>30)
    {
      this.contactoCreatedError="Error en los campos";
      setTimeout(()=>{
        this.contactoCreatedError="";
      },3000);
    }
    else{
      this.enProceso=true;
      this.contactoCreatedError= `Creando objeto...`;
      const contacto:Contacto=new Contacto (this.newContactoUrl,this.newContactoRedsocial,this.newContactologourl, this.newContactoTexto);
      this.contactoService.crear(contacto).subscribe(
        ()=>{
          this.contactoMessage= 'Creado correctamente';
          setTimeout(()=>{
            this.contactoMessage="";
          },3000);
          this.cargarContactos();
          this.newContacto=false;
          this.enProceso=false;
        },
        err=>{
          this.contactoCreatedError= `No se puede crear. Error: ${err}`;
          setTimeout(()=>{
            this.contactoCreatedError="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  borrarContacto(contacto:string):void{
    this.enProceso=true;
    this.contactoMessage="Eliminando objeto...";
    this.contactoService.eliminar(contacto).subscribe(
      data=>{
        this.cargarContactos();
        this.contactoMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.contactoMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
        this.enProceso=false;
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
    if(this.editContactoUrl=="" || this.editContactoRedsocial=="" || this.editContactologourl=="" ||
     this.editContactoUrl.length>100 || this.editContactoRedsocial.length>20 || this.editContactologourl.length>100 || this.editContactoTexto.length>30)
    {
      this.contactoMessage="Error en los campos";
      setTimeout(()=>{
        this.contactoMessage="";
      },3000);
    }
    else{ 
      this.enProceso=true;
      this.contactoMessage="Modificando objeto...";
      this.contactoService.editar(contacto,new Contacto(this.editContactoUrl,this.editContactoRedsocial,this.editContactologourl, this.editContactoTexto)).subscribe(
        data=>{
          this.contactoMessage="Editado correctamente";
          setTimeout(()=>{
            this.contactoMessage="";
          },3000);
          this.hiddenEditarContacto();
          this.cargarContactos();
          this.enProceso=false;
        },
        err=>{
          this.contactoMessage=`No se puede editar. Error: ${err}`;
          setTimeout(()=>{
            this.contactoMessage="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  restoreContacto():void{
    this.enProceso=true;
    this.contactoMessage="Restaurando... Esperar mientras se completa el pedido";
    this.contactoService.restaurar().subscribe(
      ()=>{
        this.contactoMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
        this.cargarContactos();
        this.enProceso=false;
      },
      err=>{
        this.contactoMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.contactoMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }
}
