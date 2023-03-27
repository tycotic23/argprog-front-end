import { Component } from '@angular/core';
import { Subfooterdato } from '../models/subfooterdato';
import { SubfooterdatoService } from '../service/subfooterdato.service';

@Component({
  selector: 'app-subfooterdato-edit',
  templateUrl: './subfooterdato-edit.component.html',
  styleUrls: ['./subfooterdato-edit.component.css']
})
export class SubfooterdatoEditComponent {
  subfooterdatos: Subfooterdato[]=[];
  newSubfooterdato:boolean=false;
  SubfooterdatoCreatedError:string="";
  enProceso:boolean=false;
  SubfooterdatoMessage:string="";
  editSubfooterdato:boolean=false;
  editSubfooterdatoSelected?:number=-1; //relacionado con el id

  //para crear el nuevo elemento, uno por cada propiedad del objeto
  newSubfooterdatoIconourl:string="";
  newSubfooterdatoUrl:string="";
  newSubfooterdatoTexto:string="";

  //para editar elemento, uno por cada propiedad del objeto
  editSubfooterdatoIconourl:string="";
  editSubfooterdatoUrl:string="";
  editSubfooterdatoTexto:string="";

 

  constructor(private SubfooterdatoService:SubfooterdatoService){ }

  ngOnInit(){
    this.cargarSubfooterdatos();
  }
  

  cargarSubfooterdatos():void{
    this.SubfooterdatoMessage="Espere mientras cargan los datos, puede demorar";
    this.SubfooterdatoService.verTodos().subscribe(
      data=>{
        this.subfooterdatos=data;
        this.SubfooterdatoMessage= '';
        setTimeout(()=>{
          this.SubfooterdatoMessage="";
        },3000);
      },
      err=>{
        console.log(err);
        this.SubfooterdatoMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
        setTimeout(()=>{
          this.SubfooterdatoMessage="";
        },3000);
      }
    );
  }

  //al tocarl el boton Nuevo Subfooterdato
  onNewSubfooterdato():void{
      this.newSubfooterdato=!this.newSubfooterdato;
      this.SubfooterdatoCreatedError= '';
      this.newSubfooterdatoIconourl="";
      this.newSubfooterdatoTexto="";
      this.newSubfooterdatoUrl="";
      this.SubfooterdatoMessage="";
  }

  //al tocar el boton crear del elemento que aparece al crear nuevo Subfooterdato
  onCreateSubfooterdato():void{  
    if(this.newSubfooterdatoIconourl=="" ||
     this.newSubfooterdatoIconourl.length>100 || this.newSubfooterdatoUrl.length>100 || this.newSubfooterdatoTexto.length>30)
    {
      this.SubfooterdatoCreatedError="Error en los campos";
      setTimeout(()=>{
        this.SubfooterdatoCreatedError="";
      },3000);
    }
    else{
      this.enProceso=true;
      this.SubfooterdatoCreatedError= `Creando objeto...`;
      const subfooterdato:Subfooterdato=new Subfooterdato(this.newSubfooterdatoIconourl,this.newSubfooterdatoUrl,this.newSubfooterdatoTexto);
      this.SubfooterdatoService.crear(subfooterdato).subscribe(
        ()=>{
          this.SubfooterdatoMessage= 'Creado correctamente';
          setTimeout(()=>{
            this.SubfooterdatoMessage="";
          },3000);
          this.cargarSubfooterdatos();
          this.newSubfooterdato=false;
          this.enProceso=false;
        },
        err=>{
          this.SubfooterdatoCreatedError= `No se puede crear. Error: ${err}`;
          setTimeout(()=>{
            this.SubfooterdatoCreatedError="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  borrarSubfooterdato(id?:number):void{
    this.enProceso=true;
    this.SubfooterdatoMessage="Eliminando objeto...";
    this.SubfooterdatoService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarSubfooterdatos();
        this.SubfooterdatoMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.SubfooterdatoMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.SubfooterdatoMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.SubfooterdatoMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }

  showEditarSubfooterdato(Subfooterdato:Subfooterdato):void{
    this.editSubfooterdatoIconourl=Subfooterdato.iconourl;
    this.editSubfooterdatoUrl=Subfooterdato.url;
    this.editSubfooterdatoTexto=Subfooterdato.texto;
    this.editSubfooterdato=true;
    this.editSubfooterdatoSelected=Subfooterdato.id; //el id 
    this.SubfooterdatoMessage='';
  }

  hiddenEditarSubfooterdato():void{
    this.editSubfooterdatoIconourl="";
    this.editSubfooterdatoUrl="";
    this.editSubfooterdatoTexto="";
    this.editSubfooterdato=false;
    this.editSubfooterdatoSelected=-1;
  }

  editarSubfooterdato(id?:number):void{ 
    if(this.editSubfooterdatoIconourl=="" ||
    this.editSubfooterdatoIconourl.length>100 || this.editSubfooterdatoUrl.length>100 || this.editSubfooterdatoTexto.length>30)
   {
     this.SubfooterdatoMessage="Error en los campos";
     setTimeout(()=>{
       this.SubfooterdatoMessage="";
     },3000);
   }
   else{  
      this.enProceso=true;
      this.SubfooterdatoMessage="Modificando objeto...";
      this.SubfooterdatoService.editar(Number(id),new Subfooterdato(this.editSubfooterdatoIconourl,this.editSubfooterdatoUrl, this.editSubfooterdatoTexto)).subscribe(
        data=>{
          this.SubfooterdatoMessage="Editado correctamente";
          setTimeout(()=>{
            this.SubfooterdatoMessage="";
          },3000);
          this.hiddenEditarSubfooterdato();
          this.cargarSubfooterdatos();
          this.enProceso=false;
        },
        err=>{
          this.SubfooterdatoMessage=`No se puede editar. Error: ${err}`;
          setTimeout(()=>{
            this.SubfooterdatoMessage="";
          },3000);
          this.enProceso=false;
        }
      );
   }
  }

  restoreSubfooterdato():void{
    this.enProceso=true;
    this.SubfooterdatoMessage="Restaurando... Esperar mientras se completa el pedido";
    this.SubfooterdatoService.restaurar().subscribe(
      ()=>{
        this.SubfooterdatoMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.SubfooterdatoMessage="";
        },3000);
        this.cargarSubfooterdatos();
        this.enProceso=false;
      },
      err=>{
        this.SubfooterdatoMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.SubfooterdatoMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }
}
