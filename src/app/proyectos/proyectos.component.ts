import { Component } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { ProyectoService } from '../service/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  Proyectos: Proyecto[]=[];
  ProyectoMessage:string="";

  constructor(private proyectoService:ProyectoService){ }
  
  ngOnInit(){
    this.cargarProyectos();
  }

  cargarProyectos():void{
    this.ProyectoMessage="Cargando...";
    this.proyectoService.verTodos().subscribe(
      data=>{
        this.Proyectos=data;
        this.ProyectoMessage= '';
        setTimeout(()=>{
          this.ProyectoMessage="";
        },3000);
         //si esta vacio debe ser restaurado
         if(data.length==0){
          this.restoreProyecto();
        }
      },
      err=>{
        console.log(err);
        this.ProyectoMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
        setTimeout(()=>{
          this.ProyectoMessage="";
        },3000);
      }
    );
  }

  restoreProyecto():void{
    this.ProyectoMessage="Cargando...";
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
