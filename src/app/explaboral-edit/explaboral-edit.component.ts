import { Component } from '@angular/core';
import { Explaboral } from '../models/explaboral';
import { ExplaboralService } from '../service/explaboral.service';

@Component({
  selector: 'app-explaboral-edit',
  templateUrl: './explaboral-edit.component.html',
  styleUrls: ['./explaboral-edit.component.css']
})
export class ExplaboralEditComponent {
  explaborals: Explaboral[]=[];
  newExplaboral:boolean=false;
  explaboralCreatedError:string="";
  explaboralMessage:string="";
  editExplaboral:boolean=false;
  editExplaboralSelected?:number=-1; //relacionado con el id

  //para crear el nuevo elemento, uno por cada propiedad del objeto
  newExplaboralLogourl:string="";
  newExplaboralPuesto:string="";
  newExplaboralDescripcion:string="";
  newExplaboralEmpresa:string="";
  newExplaboralReferencias:string="";
  newExplaboralFechaini:string="";
  newExplaboralFechafin:string="";


  //para editar elemento, uno por cada propiedad del objeto
  editExplaboralLogourl:string="";
  editExplaboralPuesto:string="";
  editExplaboralDescripcion:string="";
  editExplaboralEmpresa:string="";
  editExplaboralReferencias:string="";
  editExplaboralFechaini:string="";
  editExplaboralFechafin:string="";

 

  constructor(private explaboralService:ExplaboralService){ }
  
  ngOnInit(){
    this.cargarExplaborals();
  }

  cargarExplaborals():void{
    this.explaboralService.verTodos().subscribe(
      data=>{
        this.explaborals=data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  //al tocarl el boton Nuevo Explaboral
  onNewExplaboral():void{
      this.newExplaboral=!this.newExplaboral;
      this.explaboralCreatedError= '';
      this.newExplaboralLogourl="";
      this.newExplaboralDescripcion="";
      this.newExplaboralEmpresa="";
      this.newExplaboralPuesto="";
      this.explaboralMessage="";
      this.newExplaboralReferencias="";
      this.newExplaboralFechaini="";
      this.newExplaboralFechafin="";
  }

  //al tocar el boton crear del elemento que aparece al crear nuevo Explaboral
  onCreateExplaboral():void{  
    const explaboral:Explaboral=new Explaboral(this.newExplaboralLogourl,this.newExplaboralPuesto,this.newExplaboralReferencias,this.newExplaboralEmpresa,this.newExplaboralDescripcion,this.newExplaboralFechaini,this.newExplaboralFechafin);
    this.explaboralService.crear(explaboral).subscribe(
      ()=>{
        this.explaboralMessage= 'Creado correctamente';
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
        this.cargarExplaborals();
        this.newExplaboral=false;
      },
      err=>{
        this.explaboralCreatedError= `No se puede crear. Error: ${err}`;
        setTimeout(()=>{
          this.explaboralCreatedError="";
        },3000);
      }
    );
  }

  borrarExplaboral(id?:number):void{
    this.explaboralService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarExplaborals();
        this.explaboralMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
      },
      err=>{
        this.explaboralMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
      }
    );
  }

  showEditarExplaboral(explaboral:Explaboral):void{
    this.editExplaboralLogourl=explaboral.logourl;
    this.editExplaboralPuesto=explaboral.puesto;
    this.editExplaboralDescripcion=explaboral.descripcion;
    this.editExplaboralEmpresa=explaboral.empresa;
    this.editExplaboralReferencias=explaboral.referencias;
    this.editExplaboralFechaini=explaboral.fechaini;
      this.editExplaboralFechafin=explaboral.fechafin;
    this.editExplaboral=true;
    this.editExplaboralSelected=explaboral.id; //el id 
    this.explaboralMessage='';

  }

  hiddenEditarExplaboral():void{
    this.editExplaboralLogourl="";
    this.editExplaboralPuesto="";
    this.editExplaboralDescripcion="";
    this.editExplaboralEmpresa="";
    this.editExplaboralReferencias="";
    this.editExplaboral=false;
    this.editExplaboralSelected=-1;
    this.editExplaboralFechaini="";
      this.editExplaboralFechafin="";
  }

  editarExplaboral(id?:number):void{   
    this.explaboralService.editar(Number(id),new Explaboral(this.editExplaboralLogourl,this.editExplaboralPuesto,this.editExplaboralReferencias,this.editExplaboralEmpresa,this.editExplaboralDescripcion,this.editExplaboralFechaini,this.editExplaboralFechafin)).subscribe(
      data=>{
        this.explaboralMessage="Editado correctamente";
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
        this.hiddenEditarExplaboral();
        this.cargarExplaborals();
      },
      err=>{
        this.explaboralMessage=`No se puede editar. Error: ${err}`;
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
      }
    );
  }

  restoreExplaboral():void{
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
}
