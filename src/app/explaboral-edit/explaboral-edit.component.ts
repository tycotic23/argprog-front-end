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
  enProceso:boolean=false;
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
    this.explaboralMessage="Espere mientras cargan los datos, puede demorar";
    this.explaboralService.verTodos().subscribe(
      data=>{
        this.explaborals=data;
        this.explaboralMessage= '';
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
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
    if(this.newExplaboralLogourl=="" || this.newExplaboralPuesto=="" || this.newExplaboralEmpresa=="" || this.newExplaboralFechaini=="" || this.newExplaboralFechafin=="" ||
     this.newExplaboralLogourl.length>100 || this.newExplaboralPuesto.length>50 || this.newExplaboralReferencias.length>100 || this.newExplaboralEmpresa.length>50 || this.newExplaboralDescripcion.length>500 || this.newExplaboralFechaini.length>50 || this.newExplaboralFechafin.length>50)
    {
      this.explaboralCreatedError="Error en los campos";
      setTimeout(()=>{
        this.explaboralCreatedError="";
      },3000);
    }
    else{
      this.enProceso=true;
      this.explaboralCreatedError= `Creando objeto...`;
      const explaboral:Explaboral=new Explaboral(this.newExplaboralLogourl,this.newExplaboralPuesto,this.newExplaboralReferencias,this.newExplaboralEmpresa,this.newExplaboralDescripcion,this.newExplaboralFechaini,this.newExplaboralFechafin);
      this.explaboralService.crear(explaboral).subscribe(
        ()=>{
          this.explaboralMessage= 'Creado correctamente';
          setTimeout(()=>{
            this.explaboralMessage="";
          },3000);
          this.cargarExplaborals();
          this.newExplaboral=false;
          this.enProceso=false;
        },
        err=>{
          this.explaboralCreatedError= `No se puede crear. Error: ${err}`;
          setTimeout(()=>{
            this.explaboralCreatedError="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  borrarExplaboral(id?:number):void{
    this.enProceso=true;
    this.explaboralMessage="Eliminando objeto...";
    this.explaboralService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarExplaborals();
        this.explaboralMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.explaboralMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
        this.enProceso=false;
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
    if(this.editExplaboralLogourl=="" || this.editExplaboralPuesto=="" || this.editExplaboralEmpresa=="" || this.editExplaboralFechaini=="" || this.editExplaboralFechafin=="" ||
     this.editExplaboralLogourl.length>100 || this.editExplaboralPuesto.length>50 || this.editExplaboralReferencias.length>100 || this.editExplaboralEmpresa.length>50 || this.editExplaboralDescripcion.length>500 || this.editExplaboralFechaini.length>50 || this.editExplaboralFechafin.length>50)
    {
      this.explaboralMessage="Error en los campos";
      setTimeout(()=>{
        this.explaboralMessage="";
      },3000);
    }
    else{ 
      this.enProceso=true;
    this.explaboralMessage="Modificando objeto..."; 
      this.explaboralService.editar(Number(id),new Explaboral(this.editExplaboralLogourl,this.editExplaboralPuesto,this.editExplaboralReferencias,this.editExplaboralEmpresa,this.editExplaboralDescripcion,this.editExplaboralFechaini,this.editExplaboralFechafin)).subscribe(
        data=>{
          this.explaboralMessage="Editado correctamente";
          setTimeout(()=>{
            this.explaboralMessage="";
          },3000);
          this.hiddenEditarExplaboral();
          this.cargarExplaborals();
          this.enProceso=false;
        },
        err=>{
          this.explaboralMessage=`No se puede editar. Error: ${err}`;
          setTimeout(()=>{
            this.explaboralMessage="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  restoreExplaboral():void{
    this.enProceso=true;
    this.explaboralMessage="Restaurando... Esperar mientras se completa el pedido";
    this.explaboralService.restaurar().subscribe(
      ()=>{
        this.explaboralMessage='Restaurado correctamente';
        this.cargarExplaborals();
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.explaboralMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.explaboralMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }
}
