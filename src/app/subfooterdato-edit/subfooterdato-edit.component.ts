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
    this.SubfooterdatoService.verTodos().subscribe(
      data=>{
        this.subfooterdatos=data;
      },
      err=>{
        console.log(err);
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
    const subfooterdato:Subfooterdato=new Subfooterdato(this.newSubfooterdatoIconourl,this.newSubfooterdatoUrl,this.newSubfooterdatoTexto);
    this.SubfooterdatoService.crear(subfooterdato).subscribe(
      ()=>{
        this.SubfooterdatoMessage= 'Creado correctamente';
        this.cargarSubfooterdatos();
        this.newSubfooterdato=false;
      },
      err=>{
        this.SubfooterdatoCreatedError= `No se puede crear. Error: ${err}`;
      }
    );
  }

  borrarSubfooterdato(id?:number):void{
    this.SubfooterdatoService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarSubfooterdatos();
        this.SubfooterdatoMessage="Eliminado correctamente";
      },
      err=>{
        this.SubfooterdatoMessage=`No se puede eliminar. Error: ${err}`;
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

  isSubfooterdatotoEdit(Subfooterdato:string):boolean{
      //compara con la id
      return Subfooterdato==this.editSubfooterdatoIconourl;
  }

  editarSubfooterdato(id?:number):void{   
    this.SubfooterdatoService.editar(Number(id),new Subfooterdato(this.editSubfooterdatoIconourl,this.editSubfooterdatoUrl, this.editSubfooterdatoTexto)).subscribe(
      data=>{
        this.SubfooterdatoMessage="Editado correctamente";
        this.hiddenEditarSubfooterdato();
        this.cargarSubfooterdatos();
      },
      err=>{
        this.SubfooterdatoMessage=`No se puede editar. Error: ${err}`;
      }
    );
  }

  restoreSubfooterdato():void{
    this.SubfooterdatoService.restaurar().subscribe(
      ()=>{
        this.SubfooterdatoMessage='Restaurado correctamente';
        this.cargarSubfooterdatos();
      },
      err=>{
        this.SubfooterdatoMessage=`Error al restaurar. Error: ${err}`;
      }
    );
  }

  editarImagenSubfooterdato():void{
    this.SubfooterdatoMessage=`Sin implementar`;
  }
}
