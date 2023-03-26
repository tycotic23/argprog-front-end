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
  enProceso:boolean=false;
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
    this.ConocimientoMessage="Espere mientras cargan los datos, puede demorar";
    this.conocimientoService.verTodos().subscribe(
      data=>{
        this.conocimientos=data;
        this.ConocimientoMessage="";
      },
      err=>{
        this.ConocimientoMessage="Error al cargar los datos, espere unos momentos y vuelva a intentarlo";
      }
    );
  }

  cargarCategorias():void{
    this.CategoriaMessage="Espere mientras cargan los datos, puede demorar";
    this.conocimientoService.verCategorias().subscribe(
      data=>{
        this.categorias=data;
        this.CategoriaMessage="";
      },
      err=>{
        console.log(err);
        this.CategoriaMessage="Error al cargar los datos, espere unos momentos y vuelva a intentarlo";
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
    //validacion de datos
    if(this.newConocimientoLogourl=="" || this.newConocimientoNombre=="" || this.newConocimientoNombre.length>20 || this.newConocimientoLogourl.length>100 || this.newConocimientoCategoria=="")
    {
      this.ConocimientoCreatedError="Error en los campos";
      setTimeout(()=>{
        this.ConocimientoCreatedError="";
      },3000);
    }
    else{
      //primero hay que conseguir la categoria
      this.enProceso=true;
      this.ConocimientoCreatedError="Creando objeto...";
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
              this.enProceso=false;
              this.ConocimientoCreatedError="";
            },
            err=>{
              this.ConocimientoCreatedError=`No se puede crear. Error: ${err}`;
              setTimeout(()=>{
                this.ConocimientoCreatedError="";
              },3000);
              this.enProceso=false;
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
  }

  onCreateCategoria():void{ 
    //validacion de datos
    if(this.newCategoriaNombre=="" || this.newCategoriaOrden<0 || this.newCategoriaNombre.length>20 || this.newCategoriaOrden>100000)
    {
      this.CategoriaCreatedError="Error en los campos";
      setTimeout(()=>{
        this.CategoriaCreatedError="";
      },3000);
    }
    else{
      this.enProceso=true;
      this.CategoriaCreatedError="Creando objeto...";
      this.conocimientoService.crearCategoria(new Categoria(this.newCategoriaNombre,this.newCategoriaOrden)).subscribe(
        data=>{
          this.CategoriaMessage="Creado correctamente";
          setTimeout(()=>{
            this.CategoriaMessage="";
          },3000);
          this.hiddenEditar();
          this.cargarConocimientos();
          this.enProceso=false;
          this.CategoriaCreatedError="";
        },
        err=>{
          this.CategoriaCreatedError=`No se puede crear. Error: ${err}`;
          setTimeout(()=>{
            this.CategoriaCreatedError="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  borrarConocimiento(id?:number):void{
    this.enProceso=true;
    this.ConocimientoMessage="Borrando objeto...";
    this.conocimientoService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarConocimientos();
        this.ConocimientoMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.ConocimientoMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.ConocimientoMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.ConocimientoMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }

  borrarCategoria(id?:number):void{
    this.enProceso=true;
    this.CategoriaMessage="Borrando objeto...";
    this.conocimientoService.eliminarCategoria(Number(id)).subscribe(
      data=>{
        this.cargarConocimientos();
        this.CategoriaMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.CategoriaMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.CategoriaMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.CategoriaMessage="";
        },3000);
        this.enProceso=false;
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
    //validacion de datos
    if(this.editConocimientoLogourl=="" || this.editConocimientoNombre=="" || this.editConocimientoNombre.length>20 || this.editConocimientoLogourl.length>100)
    {
      this.ConocimientoMessage="Error en los campos";
      setTimeout(()=>{
        this.ConocimientoMessage="";
      },3000);
    }
    else{
      //editar
      this.enProceso=true;
      this.ConocimientoMessage="Modificando objeto...";
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
              this.enProceso=false;
            },
            err=>{
              this.ConocimientoMessage=`No se puede editar. Error: ${err}`;
              setTimeout(()=>{
                this.ConocimientoMessage="";
              },3000);
              this.enProceso=false;
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
  }

  editarCategoria(id?:number):void{ 
     //validacion de datos
     if(this.editCategoriaNombre=="" || this.editCategoriaOrden<0 || this.editCategoriaNombre.length>20 || this.editCategoriaOrden>100000)
     {
       this.CategoriaMessage="Error en los campos";
       setTimeout(()=>{
         this.CategoriaMessage="";
       },3000);
     }
     else{
      this.enProceso=true;
      this.CategoriaMessage="Modificando objeto...";
      //primero hay que conseguir la categoria
      this.conocimientoService.editarCategoria(Number(id),new Categoria(this.editCategoriaNombre, this.editCategoriaOrden)).subscribe(
        data=>{
          this.CategoriaMessage="Editado correctamente";
          setTimeout(()=>{
            this.CategoriaMessage="";
          },3000);
          this.hiddenEditar();
          this.cargarConocimientos();
          this.enProceso=false;
        },
        err=>{
          this.CategoriaMessage=`No se puede editar. Error: ${err}`;
          setTimeout(()=>{
            this.CategoriaMessage="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  restoreConocimiento():void{
    this.ConocimientoMessage='Restaurando... Esperar mientras se completa el pedido';
    this.enProceso=true;
    this.conocimientoService.restaurar().subscribe(
      ()=>{
        this.ConocimientoMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.ConocimientoMessage="";
        },3000);
        this.cargarConocimientos();
        this.enProceso=false;
      },
      err=>{
        this.ConocimientoMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.ConocimientoMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }


}
