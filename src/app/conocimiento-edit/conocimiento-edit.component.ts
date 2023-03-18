import { Component } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Conocimiento } from '../models/conocimiento';
import { ConocimientoService } from '../service/conocimiento.service';

@Component({
  selector: 'app-conocimiento-edit',
  templateUrl: './conocimiento-edit.component.html',
  styleUrls: ['./conocimiento-edit.component.css']
})
export class ConocimientoEditComponent {
  conocimientos: Conocimiento[]=[];
  categorias: Categoria[]=[];
  newConocimiento:boolean=false;
  newCategoria:boolean=false;
  ConocimientoCreatedError:string="";
  ConocimientoMessage:string="";
  CategoriaCreatedError:string="";
  CategoriaMessage:string="";
  editConocimiento:boolean=false;
  editConocimientoSelected?:number=-1; //relacionado con el id
  editCategoria:boolean=false;
  editCategoriaSelected:string="";

  //para crear el nuevo elemento, uno por cada propiedad del objeto
  newConocimientoNombre:string="";
  newConocimientoLogourl:string="";
  newConocimientoCategoria:string="";

   //para crear el nuevo elemento, uno por cada propiedad del objeto
   newCategoriaNombre:string="";
   newCategoriaOrden:number=0;

  //para editar elemento, uno por cada propiedad del objeto
  editConocimientoNombre:string="";
  editConocimientoLogourl:string="";
  editConocimientoCategoria:string="";

  editCategoriaNombre:string="";
  editCategoriaOrden:number=0;


  constructor(private conocimientoService:ConocimientoService){ }

  ngOnInit(){
    this.cargarConocimientos();
  }

  cargarConocimientos():void{
    this.cargarCategorias();
    this.conocimientoService.verTodos().subscribe(
      data=>{
        this.conocimientos=data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  cargarCategorias():void{
    this.conocimientoService.verCategorias().subscribe(
      data=>{
        this.categorias=data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  //al tocarl el boton Nuevo Conocimiento
  onNewConocimiento():void{
      this.newConocimiento=!this.newConocimiento;
      this.ConocimientoCreatedError= '';
      this.newConocimientoLogourl="";
      this.newConocimientoCategoria="";
      this.newConocimientoNombre="";
      this.ConocimientoMessage="";
  }

  onNewCategoria():void{
    this.newCategoria=!this.newCategoria;
    this.CategoriaCreatedError= '';
    this.newCategoriaNombre="";
    this.newCategoriaOrden=0;
    this.CategoriaMessage="";
}

  //al tocar el boton crear del elemento que aparece al crear nuevo Conocimiento

  onCreateConocimiento():void{ 
    //primero hay que conseguir la categoria
    this.conocimientoService.buscarCategoriaPorNombre(this.newConocimientoCategoria).subscribe(
      category=>{
        this.conocimientoService.crear(new Conocimiento(this.newConocimientoLogourl, this.newConocimientoNombre,category)).subscribe(
          data=>{
            this.ConocimientoMessage="Creado correctamente";
            setTimeout(()=>{
              this.ConocimientoMessage="";
            },3000);
            this.hiddenEditar();
            this.cargarConocimientos();
          },
          err=>{
            this.ConocimientoCreatedError=`No se puede crear. Error: ${err}`;
            setTimeout(()=>{
              this.ConocimientoCreatedError="";
            },3000);
          }
        );

      },err=>{
        this.ConocimientoCreatedError=`No se puede crear. Error: ${err}`;
        setTimeout(()=>{
          this.ConocimientoCreatedError="";
        },3000);
      }
    ); 
  }

  onCreateCategoria():void{ 
    this.conocimientoService.crearCategoria(new Categoria(this.newCategoriaNombre,this.newCategoriaOrden)).subscribe(
      data=>{
        this.CategoriaMessage="Creado correctamente";
        setTimeout(()=>{
          this.CategoriaMessage="";
        },3000);
        this.hiddenEditar();
        this.cargarConocimientos();
      },
      err=>{
        this.CategoriaCreatedError=`No se puede crear. Error: ${err}`;
        setTimeout(()=>{
          this.CategoriaCreatedError="";
        },3000);
      }
    );
  }

  borrarConocimiento(id?:number):void{
    this.conocimientoService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarConocimientos();
        this.ConocimientoMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.ConocimientoMessage="";
        },3000);
      },
      err=>{
        this.ConocimientoMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.ConocimientoMessage="";
        },3000);
      }
    );
  }

  borrarCategoria(id?:number):void{
    this.conocimientoService.eliminarCategoria(Number(id)).subscribe(
      data=>{
        this.cargarConocimientos();
        this.CategoriaMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.CategoriaMessage="";
        },3000);
      },
      err=>{
        this.CategoriaMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.CategoriaMessage="";
        },3000);
      }
    );
  }

  showEditarConocimiento(conocimiento:Conocimiento):void{
    this.editConocimientoNombre=conocimiento.nombre;
    this.editConocimientoLogourl=conocimiento.logourl;
    this.editConocimientoCategoria=conocimiento.categoria.categoria;
    this.editConocimiento=true;
    this.editConocimientoSelected=conocimiento.id; //el id 
    this.ConocimientoMessage='';
  }

  showEditarCategoria(categoria:Categoria):void{
    this.editCategoriaNombre=categoria.categoria;
    this.editCategoriaOrden=categoria.orden;
    this.editCategoria=true;
    this.editCategoriaSelected=categoria.categoria; //el id 
    this.CategoriaMessage='';
  }

  hiddenEditar():void{
    this.editConocimientoNombre="";
    this.editConocimientoLogourl="";
    this.editConocimientoCategoria="";
    this.editConocimiento=false;
    this.editConocimientoSelected=-1;
    this.newCategoria=false;
    this.editCategoriaNombre="";
    this.editCategoriaOrden=0;
    this.editCategoria=false;
    this.editCategoriaSelected="";
    this.newConocimiento=false;
  }

  editarConocimiento(id?:number):void{ 
    //primero hay que conseguir la categoria
    this.conocimientoService.buscarCategoriaPorNombre(this.editConocimientoCategoria).subscribe(
      category=>{
        this.conocimientoService.editar(Number(id),new Conocimiento(this.editConocimientoLogourl, this.editConocimientoNombre,category)).subscribe(
          data=>{
            this.ConocimientoMessage="Editado correctamente";
            setTimeout(()=>{
              this.ConocimientoMessage="";
            },3000);
            this.hiddenEditar();
            this.cargarConocimientos();
          },
          err=>{
            this.ConocimientoMessage=`No se puede editar. Error: ${err}`;
            setTimeout(()=>{
              this.ConocimientoMessage="";
            },3000);
          }
        );

      },err=>{
        this.ConocimientoMessage=`No se puede editar. Error: ${err}`;
            setTimeout(()=>{
              this.ConocimientoMessage="";
            },3000);
      }
    ); 
  }

  editarCategoria(id?:number):void{ 
    //primero hay que conseguir la categoria
    this.conocimientoService.editarCategoria(Number(id),new Categoria(this.editCategoriaNombre, this.editCategoriaOrden)).subscribe(
      data=>{
        this.CategoriaMessage="Editado correctamente";
        setTimeout(()=>{
          this.CategoriaMessage="";
        },3000);
        this.hiddenEditar();
        this.cargarConocimientos();
      },
      err=>{
        this.CategoriaMessage=`No se puede editar. Error: ${err}`;
        setTimeout(()=>{
          this.CategoriaMessage="";
        },3000);
      }
    );
  }

  restoreConocimiento():void{
    this.conocimientoService.restaurar().subscribe(
      ()=>{
        this.ConocimientoMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.ConocimientoMessage="";
        },3000);
        this.cargarConocimientos();
      },
      err=>{
        this.ConocimientoMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.ConocimientoMessage="";
        },3000);
      }
    );
  }


}
