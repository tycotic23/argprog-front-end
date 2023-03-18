import { Component } from '@angular/core';
import { Educacion } from '../models/educacion';
import { EducacionService } from '../service/educacion.service';

@Component({
  selector: 'app-educacion-edit',
  templateUrl: './educacion-edit.component.html',
  styleUrls: ['./educacion-edit.component.css']
})
export class EducacionEditComponent {
  educacions: Educacion[]=[];
  newEducacion:boolean=false;
  educacionCreatedError:string="";
  educacionMessage:string="";
  editEducacion:boolean=false;
  editEducacionSelected?:number=-1; //relacionado con el id

  //para crear el nuevo elemento, uno por cada propiedad del objeto
  newEducacionLogourl:string="";
  newEducacionInstitucion:string="";
  newEducacionTitulo:string="";
  newEducacionFechaini:string="";
  newEducacionFechafin:string="";


  //para editar elemento, uno por cada propiedad del objeto
  editEducacionLogourl:string="";
  editEducacionInstitucion:string="";
  editEducacionTitulo:string="";
  editEducacionFechaini:string="";
  editEducacionFechafin:string="";

 

  constructor(private educacionService:EducacionService){ }
  
  ngOnInit(){
    this.cargarEducacions();
  }

  cargarEducacions():void{
    this.educacionService.verTodos().subscribe(
      data=>{
        this.educacions=data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  //al tocarl el boton Nuevo Educacion
  onNewEducacion():void{
      this.newEducacion=!this.newEducacion;
      this.educacionCreatedError= '';
      this.newEducacionLogourl="";
      this.newEducacionTitulo="";
      this.newEducacionInstitucion="";
      this.educacionMessage="";
      this.newEducacionFechaini="";
      this.newEducacionFechafin="";
  }

  //al tocar el boton crear del elemento que aparece al crear nuevo Educacion
  onCreateEducacion():void{  
    const educacion:Educacion=new Educacion(this.newEducacionLogourl,this.newEducacionFechaini,this.newEducacionFechafin,this.newEducacionInstitucion,this.newEducacionTitulo);
    this.educacionService.crear(educacion).subscribe(
      ()=>{
        this.educacionMessage= 'Creado correctamente';
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
        this.cargarEducacions();
        this.newEducacion=false;
      },
      err=>{
        this.educacionCreatedError= `No se puede crear. Error: ${err}`;
        setTimeout(()=>{
          this.educacionCreatedError="";
        },3000);
      }
    );
  }

  borrarEducacion(id?:number):void{
    this.educacionService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarEducacions();
        this.educacionMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
      },
      err=>{
        this.educacionMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
      }
    );
  }

  showEditarEducacion(educacion:Educacion):void{
    this.editEducacionLogourl=educacion.logourl;
    this.editEducacionInstitucion=educacion.institucion;
    this.editEducacionTitulo=educacion.titulo;
    this.editEducacionFechaini=educacion.fechaini;
      this.editEducacionFechafin=educacion.fechafin;
    this.editEducacion=true;
    this.editEducacionSelected=educacion.id; //el id 
    this.educacionMessage='';

  }

  hiddenEditarEducacion():void{
    this.editEducacionLogourl="";
    this.editEducacionInstitucion="";
    this.editEducacionTitulo="";
    this.editEducacion=false;
    this.editEducacionSelected=-1;
    this.editEducacionFechaini="";
      this.editEducacionFechafin="";
  }

  editarEducacion(id?:number):void{   
    this.educacionService.editar(Number(id),new Educacion(this.editEducacionLogourl,this.editEducacionFechaini,this.editEducacionFechafin,this.editEducacionInstitucion,this.editEducacionTitulo)).subscribe(
      data=>{
        this.educacionMessage="Editado correctamente";
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
        this.hiddenEditarEducacion();
        this.cargarEducacions();
      },
      err=>{
        this.educacionMessage=`No se puede editar. Error: ${err}`;
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
      }
    );
  }

  restoreEducacion():void{
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
