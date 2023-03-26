import { Component } from '@angular/core';
import { Idioma } from '../models/idioma';
import { IdiomaService } from '../service/idioma.service';

@Component({
  selector: 'app-idiomas-edit',
  templateUrl: './idiomas-edit.component.html',
  styleUrls: ['./idiomas-edit.component.css']
})
export class IdiomasEditComponent {

  idiomas: Idioma[]=[];
  newIdioma:boolean=false;
  newIdiomaName:string="";
  enProceso:boolean=false;
  newIdiomaNivel:number=0;
  idiomaCreatedError:string="";
  idiomaMessage:string="";
  editIdioma:boolean=false;
  editIdiomaName:string="";
  editIdiomaNivel:number=0;
  editIdiomaSelected:string="";

  constructor(private idiomaService:IdiomaService){ }

  ngOnInit(){
    this.cargarIdiomas();
  }

  cargarIdiomas():void{
    this.idiomaMessage="Espere mientras cargan los datos, puede demorar";
    this.idiomaService.verTodos().subscribe(
      data=>{
        this.idiomas=data;
        this.idiomaMessage= '';
        setTimeout(()=>{
          this.idiomaMessage="";
        },3000);
      },
      err=>{
        console.log(err);
        this.idiomaMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
        setTimeout(()=>{
          this.idiomaMessage="";
        },3000);
      }
    );
  }

  //al tocarl el boton Nuevo Idioma
  onNewIdioma():void{
      this.newIdioma=!this.newIdioma;
      this.idiomaCreatedError= '';
      this.newIdiomaName="";
      this.newIdiomaNivel=0;
      this.idiomaMessage="";
  }

  //al tocar el boton crear del elemento que aparece al crear nuevo idioma
  onCreateidioma():void{
    if(this.newIdiomaName=="" || this.newIdiomaNivel<0 ||
     this.newIdiomaName.length>30 || this.newIdiomaNivel>100)
    {
      this.idiomaCreatedError="Error en los campos";
      setTimeout(()=>{
        this.idiomaCreatedError="";
      },3000);
    }
    else{
      this.enProceso=true;
        this.idiomaCreatedError= `Creando objeto...`;
      const idioma:Idioma=new Idioma (this.newIdiomaName,this.newIdiomaNivel);
      this.idiomaService.crear(idioma).subscribe(
        ()=>{
          this.idiomaMessage= 'Creado correctamente';
          setTimeout(()=>{
            this.idiomaMessage="";
          },3000);
          this.cargarIdiomas();
          this.newIdioma=false;
          this.enProceso=false;
        },
        err=>{
          this.idiomaCreatedError= `No se puede crear. Error: ${err}`;
          setTimeout(()=>{
            this.idiomaCreatedError="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  borrarIdioma(idioma:string):void{
    this.enProceso=true;
    this.idiomaMessage="Eliminando objeto...";
    this.idiomaService.eliminar(idioma).subscribe(
      data=>{
        this.cargarIdiomas();
        this.idiomaMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.idiomaMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.idiomaMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.idiomaMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }

  showEditarIdioma(idioma:Idioma):void{
    this.editIdiomaName=idioma.idioma;
    this.editIdiomaNivel=idioma.nivel;
    this.editIdioma=true;
    this.editIdiomaSelected=idioma.idioma;
    this.idiomaMessage='';
  }

  hiddenEditarIdioma():void{
    this.editIdiomaName="";
    this.editIdiomaNivel=0;
    this.editIdioma=false;
    this.editIdiomaSelected="";
  }

  editarIdioma(idioma:string):void{
    if(this.editIdiomaName=="" || this.editIdiomaNivel<0 ||
     this.editIdiomaName.length>30 || this.editIdiomaNivel>100)
    {
      this.idiomaMessage="Error en los campos";
      setTimeout(()=>{
        this.idiomaMessage="";
      },3000);
    }
    else{
      this.enProceso=true;
      this.idiomaMessage="Modificando objeto...";
      this.idiomaService.editar(idioma,new Idioma(this.editIdiomaName,this.editIdiomaNivel)).subscribe(
        data=>{
          this.idiomaMessage="Editado correctamente";
          setTimeout(()=>{
            this.idiomaMessage="";
          },3000);
          this.hiddenEditarIdioma();
          this.cargarIdiomas();
          this.enProceso=false;
        },
        err=>{
          this.idiomaMessage=`No se puede eliminar. Error: ${err}`;
          setTimeout(()=>{
            this.idiomaMessage="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  restoreIdioma():void{
    this.enProceso=true;
    this.idiomaMessage="Restaurando... Esperar mientras se completa el pedido";
    this.idiomaService.restaurar().subscribe(
      ()=>{
        this.idiomaMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.idiomaMessage="";
        },3000);
        this.enProceso=false;
        this.cargarIdiomas();
      },
      err=>{
        this.idiomaMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.idiomaMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }

}
