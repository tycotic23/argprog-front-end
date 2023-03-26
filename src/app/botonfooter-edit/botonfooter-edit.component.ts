import { Component } from '@angular/core';
import { Botonfooter } from '../models/botonfooter';
import { BotonfooterService } from '../service/botonfooter.service';

@Component({
  selector: 'app-botonfooter-edit',
  templateUrl: './botonfooter-edit.component.html',
  styleUrls: ['./botonfooter-edit.component.css']
})
export class BotonfooterEditComponent {
  Botonfooters: Botonfooter[]=[];
  newBotonfooter:boolean=false;
  BotonfooterCreatedError:string="";
  enProceso:boolean=false;
  BotonfooterMessage:string="";
  editBotonfooter:boolean=false;
  editBotonfooterSelected?:number=-1; //relacionado con el id

  //para crear el nuevo elemento, uno por cada propiedad del objeto
  newBotonfooterLogo:string="";
  newBotonfooterUrl:string="";


  //para editar elemento, uno por cada propiedad del objeto
  editBotonfooterLogo:string="";
  editBotonfooterUrl:string="";

 

  constructor(private botonfooterService:BotonfooterService){ }
  
  ngOnInit(){
    this.cargarBotonfooters();
  }

  cargarBotonfooters():void{
    this.BotonfooterMessage="Espere mientras cargan los datos, puede demorar";
    this.botonfooterService.verTodos().subscribe(
      data=>{
        this.Botonfooters=data;
        this.BotonfooterMessage= '';
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
      },
      err=>{
        console.log(err);
        this.BotonfooterMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
      }
    );
  }

  //al tocarl el boton Nuevo Botonfooter
  onNewBotonfooter():void{
      this.newBotonfooter=!this.newBotonfooter;
      this.BotonfooterCreatedError= '';
      this.newBotonfooterLogo="";
      this.newBotonfooterUrl="";
      this.BotonfooterMessage="";
  }

  //al tocar el boton crear del elemento que aparece al crear nuevo Botonfooter
  onCreateBotonfooter():void{ 
    //validacion de datos
    if(this.newBotonfooterLogo=="" || this.newBotonfooterUrl=="" ||
     this.newBotonfooterLogo.length>100 || this.newBotonfooterUrl.length>100)
    {
      this.BotonfooterCreatedError="Error en los campos";
      setTimeout(()=>{
        this.BotonfooterCreatedError="";
      },3000);
    }
    else{ 
      this.enProceso=true;
      this.BotonfooterCreatedError= `Creando objeto...`;
      const botonfooter:Botonfooter=new Botonfooter(this.newBotonfooterLogo,this.newBotonfooterUrl);
      this.botonfooterService.crear(botonfooter).subscribe(
        ()=>{
          this.BotonfooterMessage= 'Creado correctamente';
          setTimeout(()=>{
            this.BotonfooterMessage="";
          },3000);
          this.cargarBotonfooters();
          this.newBotonfooter=false;
          this.enProceso=false;
        },
        err=>{
          this.BotonfooterCreatedError= `No se puede crear. Error: ${err}`;
          setTimeout(()=>{
            this.BotonfooterCreatedError="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  borrarBotonfooter(id?:number):void{
    this.enProceso=true;
    this.BotonfooterMessage="Eliminando objeto...";
    this.botonfooterService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarBotonfooters();
        this.BotonfooterMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.BotonfooterMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }

  showEditarBotonfooter(botonfooter:Botonfooter):void{
    this.editBotonfooterLogo=botonfooter.logo;
    this.editBotonfooterUrl=botonfooter.url;
    this.editBotonfooter=true;
    this.editBotonfooterSelected=botonfooter.id; //el id 
    this.BotonfooterMessage='';

  }

  hiddenEditarBotonfooter():void{
    this.editBotonfooterLogo="";
    this.editBotonfooterUrl="";
    this.editBotonfooter=false;
    this.editBotonfooterSelected=-1;
  }

  editarBotonfooter(id?:number):void{
    if(this.editBotonfooterLogo=="" || this.editBotonfooterUrl=="" ||
     this.editBotonfooterLogo.length>100 || this.editBotonfooterUrl.length>100)
    {
      this.BotonfooterMessage="Error en los campos";
      setTimeout(()=>{
        this.BotonfooterMessage="";
      },3000);
    }
    else{ 
      this.enProceso=true;
    this.BotonfooterMessage="Modificando objeto...";
      this.botonfooterService.editar(Number(id),new Botonfooter(this.editBotonfooterLogo,this.editBotonfooterUrl)).subscribe(
        data=>{
          this.BotonfooterMessage="Editado correctamente";
          setTimeout(()=>{
            this.BotonfooterMessage="";
          },3000);
          this.hiddenEditarBotonfooter();
          this.cargarBotonfooters();
          this.enProceso=false;
        },
        err=>{
          this.BotonfooterMessage=`No se puede editar. Error: ${err}`;
          setTimeout(()=>{
            this.BotonfooterMessage="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  restoreBotonfooter():void{
    this.enProceso=true;
    this.BotonfooterMessage="Restaurando... Esperar mientras se completa el pedido";
    this.botonfooterService.restaurar().subscribe(
      ()=>{
        this.BotonfooterMessage='Restaurado correctamente';
        this.cargarBotonfooters();
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.BotonfooterMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }

}
