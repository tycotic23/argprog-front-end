import { Component } from '@angular/core';
import { Explaboral } from '../models/explaboral';
import { ExplaboralService } from '../service/explaboral.service';
import { Educacion } from '../models/educacion';
import { EducacionService } from '../service/educacion.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent {
  explaborals: Explaboral[]=[];
  explaboralMessage:string="";
  educacions: Educacion[]=[];
  educacionMessage:string="";

  constructor(private explaboralService:ExplaboralService, private educacionService:EducacionService){ }

  ngOnInit(){
    this.cargarExplaborals();
    this.cargarEducacions();
  }

  cargarExplaborals():void{
    this.explaboralMessage="Cargando...";
    this.explaboralService.verTodos().subscribe(
      data=>{
        this.explaborals=data;
        this.explaboralMessage= '';
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
         //si esta vacio debe ser restaurado
         if(data.length==0){
          this.restoreExplaboral();
        }
      },
      err=>{
        console.log(err);
        this.explaboralMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
      }
    );
  }

  cargarEducacions():void{
    this.educacionMessage="Cargando...";
    this.educacionService.verTodos().subscribe(
      data=>{
        this.educacions=data;
        this.educacionMessage= '';
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
        //si esta vacio debe ser restaurado
        if(data.length==0){
          this.restoreEducacion();
        }
      },
      err=>{
        console.log(err);
        this.educacionMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
      }
    );
  }

  restoreExplaboral():void{
    this.explaboralMessage="Cargando...";
    this.explaboralService.restaurar().subscribe(
      ()=>{
        this.explaboralMessage='Restaurado correctamente';
        this.cargarExplaborals();
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
      },
      err=>{
        this.explaboralMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
      }
    );
  }

  restoreEducacion():void{
    this.educacionMessage="Cargando...";
    this.educacionService.restaurar().subscribe(
      ()=>{
        this.educacionMessage='Restaurado correctamente';
        this.cargarEducacions();
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
      },
      err=>{
        this.educacionMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
      }
    );
  }

}
