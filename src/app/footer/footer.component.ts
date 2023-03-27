import { Component } from '@angular/core';
import { Subfooterdato } from '../models/subfooterdato';
import { SubfooterdatoService } from '../service/subfooterdato.service';
import { Botonfooter } from '../models/botonfooter';
import { BotonfooterService } from '../service/botonfooter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  subfooterdatos: Subfooterdato[]=[];
  Botonfooters: Botonfooter[]=[];
  SubfooterdatoMessage:string="";
  BotonfooterMessage:string="";

  constructor(private SubfooterdatoService:SubfooterdatoService, private botonfooterService:BotonfooterService){ }

  ngOnInit(){
    this.cargarSubfooterdatos();
    this.cargarBotonfooters();
  }

  cargarSubfooterdatos():void{
    this.SubfooterdatoMessage="Cargando...";
    this.SubfooterdatoService.verTodos().subscribe(
      data=>{
        this.subfooterdatos=data;
        this.SubfooterdatoMessage= '';
        setTimeout(()=>{
          this.SubfooterdatoMessage="";
        },3000);
        //si esta vacio debe ser restaurado
        if(data.length==0){
          this.restoreSubfooterdato();
        }
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

  cargarBotonfooters():void{
    this.BotonfooterMessage="Cargando...";
    this.botonfooterService.verTodos().subscribe(
      data=>{
        this.Botonfooters=data;
        this.BotonfooterMessage= '';
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
        //si esta vacio debe ser restaurado
        if(data.length==0){
          this.restoreBotonfooter();
        }
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

  restoreBotonfooter():void{
    this.BotonfooterMessage="Cargando...";
    this.botonfooterService.restaurar().subscribe(
      ()=>{
        this.BotonfooterMessage='';
        this.cargarBotonfooters();
      },
      err=>{
        this.BotonfooterMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.BotonfooterMessage="";
        },3000);
      }
    );
  }

  restoreSubfooterdato():void{
    this.SubfooterdatoMessage="Cargando...";
    this.SubfooterdatoService.restaurar().subscribe(
      ()=>{
        this.SubfooterdatoMessage='';
        this.cargarSubfooterdatos();
      },
      err=>{
        this.SubfooterdatoMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.SubfooterdatoMessage="";
        },3000);
      }
    );
  }
}
