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
    this.botonfooterService.verTodos().subscribe(
      data=>{
        this.Botonfooters=data;
      },
      err=>{
        console.log(err);
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
    const botonfooter:Botonfooter=new Botonfooter(this.newBotonfooterLogo,this.newBotonfooterUrl);
    this.botonfooterService.crear(botonfooter).subscribe(
      ()=>{
        this.BotonfooterMessage= 'Creado correctamente';
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
        this.cargarBotonfooters();
        this.newBotonfooter=false;
      },
      err=>{
        this.BotonfooterCreatedError= `No se puede crear. Error: ${err}`;
        setTimeout(()=>{
          this.BotonfooterCreatedError="";
        },3000);
      }
    );
  }

  borrarBotonfooter(id?:number):void{
    this.botonfooterService.eliminar(Number(id)).subscribe(
      data=>{
        this.cargarBotonfooters();
        this.BotonfooterMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
      },
      err=>{
        this.BotonfooterMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
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
    this.botonfooterService.editar(Number(id),new Botonfooter(this.editBotonfooterLogo,this.editBotonfooterUrl)).subscribe(
      data=>{
        this.BotonfooterMessage="Editado correctamente";
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
        this.hiddenEditarBotonfooter();
        this.cargarBotonfooters();
      },
      err=>{
        this.BotonfooterMessage=`No se puede editar. Error: ${err}`;
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
      }
    );
  }

  restoreBotonfooter():void{
    this.botonfooterService.restaurar().subscribe(
      ()=>{
        this.BotonfooterMessage='Restaurado correctamente';
        this.cargarBotonfooters();
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
      },
      err=>{
        this.BotonfooterMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
      }
    );
  }

}
