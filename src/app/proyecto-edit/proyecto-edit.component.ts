import { Component } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { ProyectoService } from '../service/proyecto.service';

@Component({
  selector: 'app-proyecto-edit',
  templateUrl: './proyecto-edit.component.html',
  styleUrls: ['./proyecto-edit.component.css']
})
export class ProyectoEditComponent {

  Proyectos: Proyecto[]=[];
  newProyecto:boolean=false;
  ProyectoCreatedError:string="";
  ProyectoMessage:string="";
  editProyecto:boolean=false;
  editProyectoSelected?:number=-1; //relacionado con el id

  //para crear el nuevo elemento, uno por cada propiedad del objeto
  newProyectoPictureurl:string="";
  newProyectoTitulo:string="";
  newProyectoDescripcion:string="";
  newProyectoBotonver:boolean=false;
  newProyectoBotonurl:string="";

  //para editar elemento, uno por cada propiedad del objeto
  editProyectoPictureurl:string="";
  editProyectoTitulo:string="";
  editProyectoDescripcion:string="";
  editProyectoBotonver:boolean=false;
  editProyectoBotonurl:string="";

 

  constructor(private proyectoService:ProyectoService){ }
  
  ngOnInit(){
    this.cargarProyectos();
  }

  cargarProyectos():void{
    this.proyectoService.verTodos().subscribe(
      data=>{
        this.Proyectos=data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  //al tocarl el boton Nuevo Proyecto
  onNewProyecto():void{
      this.newProyecto=!this.newProyecto;
      this.ProyectoCreatedError= '';
      this.newProyectoPictureurl="";
      this.newProyectoDescripcion="";
      this.newProyectoBotonver=true;
    this.newProyectoBotonurl="";
      this.newProyectoTitulo="";
      this.ProyectoMessage="";
      this.newProyectoBotonurl="";
      this.newProyectoBotonver=false;
  }

  //al tocar el boton crear del elemento que aparece al crear nuevo Proyecto
  onCreateProyecto():void{  
    const proyecto:Proyecto=new Proyecto(this.newProyectoPictureurl,this.newProyectoTitulo,this.newProyectoDescripcion,this.newProyectoBotonver,this.newProyectoBotonurl);
    this.proyectoService.crear(proyecto).subscribe(
      ()=>{
        this.ProyectoMessage= 'Creado correctamente';
        setTimeout(()=>{
          this.ProyectoMessage="";
        },3000);
        this.cargarProyectos();
        this.newProyecto=false;
      },
      err=>{
        this.ProyectoCreatedError= `No se puede crear. Error: ${err}`;
        setTimeout(()=>{
          this.ProyectoCreatedError="";
        },3000);
      }
    );
  }

  borrarProyecto(id?:number):void{
    this.proyectoService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarProyectos();
        this.ProyectoMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.ProyectoMessage="";
        },3000);
      },
      err=>{
        this.ProyectoMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.ProyectoMessage="";
        },3000);
      }
    );
  }

  showEditarProyecto(proyecto:Proyecto):void{
    this.editProyectoPictureurl=proyecto.pictureurl;
    this.editProyectoTitulo=proyecto.titulo;
    this.editProyectoDescripcion=proyecto.descripcion;
    this.editProyectoBotonver=proyecto.botonver;
    this.editProyectoBotonurl=proyecto.botonurl;
    this.editProyecto=true;
    this.editProyectoSelected=proyecto.id; //el id 
    this.ProyectoMessage='';
  }

  hiddenEditarProyecto():void{
    this.editProyectoPictureurl="";
    this.editProyectoTitulo="";
    this.editProyectoDescripcion="";
    this.editProyectoBotonver=false;
    this.editProyectoBotonurl="";
    this.editProyecto=false;
    this.editProyectoSelected=-1;
  }

  editarProyecto(id?:number):void{   
    this.proyectoService.editar(Number(id),new Proyecto(this.editProyectoPictureurl,this.editProyectoTitulo, this.editProyectoDescripcion,this.editProyectoBotonver,this.editProyectoBotonurl)).subscribe(
      data=>{
        this.ProyectoMessage="Editado correctamente";
        setTimeout(()=>{
          this.ProyectoMessage="";
        },3000);
        this.hiddenEditarProyecto();
        this.cargarProyectos();
      },
      err=>{
        this.ProyectoMessage=`No se puede editar. Error: ${err}`;
        setTimeout(()=>{
          this.ProyectoMessage="";
        },3000);
      }
    );
  }

  restoreProyecto():void{
    this.proyectoService.restaurar().subscribe(
      ()=>{
        this.ProyectoMessage='Restaurado correctamente';
        this.cargarProyectos();
        setTimeout(()=>{
          this.ProyectoMessage="";
        },3000);
      },
      err=>{
        this.ProyectoMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.ProyectoMessage="";
        },3000);
      }
    );
  }

}
