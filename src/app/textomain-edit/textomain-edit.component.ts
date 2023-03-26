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
  enProceso:boolean=false;
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
    this.TextomainMessage="Espere mientras cargan los datos, puede demorar";
    this.textomainService.verTodos().subscribe(
      data=>{
        this.Textomains=data;
        this.TextomainMessage= '';
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
      },
      err=>{
        console.log(err);
        this.TextomainMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
        setTimeout(()=>{
          this.TextomainMessage="";
        },10000);
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
    if(this.editTextomainNombre=="" || this.editTextomainFotourl=="" || this.editTextomainUbicacion=="" ||
     this.editTextomainNombre.length>40 || this.editTextomainTexto.length>1500 || this.editTextomainFotourl.length>100 || this.editTextomainUbicacion.length>30)
    {
      this.TextomainMessage="Error en los campos";
      setTimeout(()=>{
        this.TextomainMessage="";
      },3000);
    }
    else{
      this.enProceso=true;
      this.TextomainMessage="Modificando objeto..."; 
      this.textomainService.editar(Number(id),new Textomain(this.editTextomainNombre,this.editTextomainTexto,this.editTextomainFotourl,this.editTextomainUbicacion)).subscribe(
        data=>{
          this.TextomainMessage="Editado correctamente";
          setTimeout(()=>{
            this.TextomainMessage="";
          },3000);
          this.hiddenEditarTextomain();
          this.cargarTextomains();
          this.enProceso=false;
        },
        err=>{
          this.TextomainMessage=`No se puede editar. Error: ${err}`;
          setTimeout(()=>{
            this.TextomainMessage="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  restoreTextomain():void{
    this.enProceso=true;
    this.TextomainMessage="Restaurando... Esperar mientras se completa el pedido";
    this.textomainService.restaurar().subscribe(
      ()=>{
        this.TextomainMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
        this.cargarTextomains();
        this.enProceso=false;
      },
      err=>{
        this.TextomainMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.TextomainMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }
}
