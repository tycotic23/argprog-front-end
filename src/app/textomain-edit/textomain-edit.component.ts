import { Component } from '@angular/core';
import { Textomain } from '../models/textomain';
import { TextomainService } from '../service/textomain.service';

@Component({
  selector: 'app-textomain-edit',
  templateUrl: './textomain-edit.component.html',
  styleUrls: ['./textomain-edit.component.css']
})
export class TextomainEditComponent {
  Textomains: Textomain[]=[];
  newTextomain:boolean=false;
  TextomainCreatedError:string="";
  TextomainMessage:string="";
  editTextomain:boolean=false;
  editTextomainSelected?:number=-1; //relacionado con el id

  //para crear el nuevo elemento, uno por cada propiedad del objeto
  newTextomainNombre:string="";
  newTextomainUbicacion:string="";
  newTextomainFotourl:string="";
  newTextomainTexto:string="";

  //para editar elemento, uno por cada propiedad del objeto
  editTextomainNombre:string="";
  editTextomainUbicacion:string="";
  editTextomainFotourl:string="";
  editTextomainTexto:string="";

 

  constructor(private textomainService:TextomainService){ }

  ngOnInit(){
    this.cargarTextomains();
  }

  cargarTextomains():void{
    this.textomainService.verTodos().subscribe(
      data=>{
        this.Textomains=data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  //al tocarl el boton Nuevo Textomain
  onNewTextomain():void{
      this.newTextomain=!this.newTextomain;
      this.TextomainCreatedError= '';
      this.newTextomainNombre="";
      this.newTextomainFotourl="";
      this.newTextomainTexto="";
      this.newTextomainUbicacion="";
      this.TextomainMessage="";
  }

  //al tocar el boton crear del elemento que aparece al crear nuevo Textomain
  onCreateTextomain():void{  
    const textomain:Textomain=new Textomain (this.newTextomainNombre,this.newTextomainTexto,this.newTextomainFotourl,this.newTextomainUbicacion);
    this.textomainService.crear(textomain).subscribe(
      ()=>{
        this.TextomainMessage= 'Creado correctamente';
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
        this.cargarTextomains();
        this.newTextomain=false;
      },
      err=>{
        this.TextomainCreatedError= `No se puede crear. Error: ${err}`;
        setTimeout(()=>{
          this.TextomainCreatedError="";
        },3000);
      }
    );
  }

  borrarTextomain(id?:number):void{
    this.textomainService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarTextomains();
        this.TextomainMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
      },
      err=>{
        this.TextomainMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
      }
    );
  }

  showEditarTextomain(textomain:Textomain):void{
    this.editTextomainNombre=textomain.nombre;
    this.editTextomainUbicacion=textomain.ubicacion;
    this.editTextomainFotourl=textomain.fotourl;
    this.editTextomainTexto=textomain.texto;
    this.editTextomain=true;
    this.editTextomainSelected=textomain.id; //el id 
    this.TextomainMessage='';
  }

  hiddenEditarTextomain():void{
    this.editTextomainNombre="";
    this.editTextomainUbicacion="";
    this.editTextomainFotourl="";
    this.editTextomainTexto="";
    this.editTextomain=false;
    this.editTextomainSelected=-1;
  }

  editarTextomain(id?:number):void{   
    this.textomainService.editar(Number(id),new Textomain(this.editTextomainNombre,this.editTextomainTexto,this.editTextomainFotourl,this.editTextomainUbicacion)).subscribe(
      data=>{
        this.TextomainMessage="Editado correctamente";
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
        this.hiddenEditarTextomain();
        this.cargarTextomains();
      },
      err=>{
        this.TextomainMessage=`No se puede editar. Error: ${err}`;
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
      }
    );
  }

  restoreTextomain():void{
    this.textomainService.restaurar().subscribe(
      ()=>{
        this.TextomainMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
        this.cargarTextomains();
      },
      err=>{
        this.TextomainMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
      }
    );
  }
}
