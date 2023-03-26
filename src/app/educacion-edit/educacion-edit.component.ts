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
  enProceso:boolean=false;
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
    this.educacionMessage="Espere mientras cargan los datos, puede demorar";
    this.educacionService.verTodos().subscribe(
      data=>{
        this.educacions=data;
        this.educacionMessage= '';
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
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
    if(this.newEducacionLogourl=="" || this.newEducacionFechaini=="" || this.newEducacionFechafin=="" || this.newEducacionInstitucion=="" || this.newEducacionTitulo=="" ||
     this.newEducacionLogourl.length>100 || this.newEducacionFechaini.length>20 || this.newEducacionFechafin.length>20 || this.newEducacionInstitucion.length>100 || this.newEducacionTitulo.length>100)
    {
      this.educacionCreatedError="Error en los campos";
      setTimeout(()=>{
        this.educacionCreatedError="";
      },3000);
    }
    else{  
      this.enProceso=true;
      this.educacionCreatedError= `Creando objeto...`;
      const educacion:Educacion=new Educacion(this.newEducacionLogourl,this.newEducacionFechaini,this.newEducacionFechafin,this.newEducacionInstitucion,this.newEducacionTitulo);
      this.educacionService.crear(educacion).subscribe(
        ()=>{
          this.educacionMessage= 'Creado correctamente';
          setTimeout(()=>{
            this.educacionMessage="";
          },3000);
          this.cargarEducacions();
          this.newEducacion=false;
          this.enProceso=false;
        },
        err=>{
          this.educacionCreatedError= `No se puede crear. Error: ${err}`;
          setTimeout(()=>{
            this.educacionCreatedError="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  borrarEducacion(id?:number):void{
    this.enProceso=true;
    this.educacionMessage="Eliminando objeto...";
    this.educacionService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarEducacions();
        this.educacionMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.educacionMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
        this.enProceso=false;
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
    if(this.editEducacionLogourl=="" || this.editEducacionFechaini=="" || this.editEducacionFechafin=="" || this.editEducacionInstitucion=="" || this.editEducacionTitulo=="" ||
     this.editEducacionLogourl.length>100 || this.editEducacionFechaini.length>20 || this.editEducacionFechafin.length>20 || this.editEducacionInstitucion.length>100 || this.editEducacionTitulo.length>100)
    {
      this.educacionMessage="Error en los campos";
      setTimeout(()=>{
        this.educacionMessage="";
      },3000);
    }
    else{ 
      this.enProceso=true;
      this.educacionMessage="Modificando objeto...";  
      this.educacionService.editar(Number(id),new Educacion(this.editEducacionLogourl,this.editEducacionFechaini,this.editEducacionFechafin,this.editEducacionInstitucion,this.editEducacionTitulo)).subscribe(
        data=>{
          this.educacionMessage="Editado correctamente";
          setTimeout(()=>{
            this.educacionMessage="";
          },3000);
          this.hiddenEditarEducacion();
          this.cargarEducacions();
          this.enProceso=false;
        },
        err=>{
          this.educacionMessage=`No se puede editar. Error: ${err}`;
          setTimeout(()=>{
            this.educacionMessage="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  restoreEducacion():void{
    this.enProceso=true;
    this.educacionMessage="Restaurando... Esperar mientras se completa el pedido";
    this.educacionService.restaurar().subscribe(
      ()=>{
        this.educacionMessage='Restaurado correctamente';
        this.cargarEducacions();
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.educacionMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.educacionMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }
}
