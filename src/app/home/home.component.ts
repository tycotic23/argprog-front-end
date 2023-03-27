import { Component } from '@angular/core';
import { Idioma } from '../models/idioma';
import { IdiomaService } from '../service/idioma.service';
import { Skill } from '../models/skill';
import { SkillService } from '../service/skill.service';
import { Textomain } from '../models/textomain';
import { TextomainService } from '../service/textomain.service';
import { Categoria } from '../models/categoria';
import { Conocimiento } from '../models/conocimiento';
import { ConocimientoService } from '../service/conocimiento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  idiomaMessage:string="";
  idiomas: Idioma[]=[];
  skillMessage:string="";
  skills: Skill[]=[];
  TextomainMessage:string="";
  Textomains: Textomain=new Textomain("","","","");
  ConocimientoMessage:string="";
  conocimientos: Conocimiento[]=[];
  categorias: Categoria[]=[];

  constructor(private conocimientoService:ConocimientoService,private idiomaService:IdiomaService, private SkillService:SkillService, private textomainService:TextomainService){ }

  ngOnInit(){
    this.cargarIdiomas();
    this.cargarskills();
    this.cargarTextomains();
    this.cargarConocimientos();
  }

  filtrarPorCategoria(conocimientos:Conocimiento[],categoria:string){
    return conocimientos.filter(c=>c.categoria.categoria==categoria);
  }

  cargarConocimientos():void{
    this.cargarCategorias();
    this.ConocimientoMessage="Cargando...";
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
    this.conocimientoService.verCategorias().subscribe(
      data=>{
        this.categorias=data;
        /* data.forEach(category=>{
          this.conocimientoscategorizados.push(this.conocimientosbyCategoria(category.categoria));
        });
        console.log(this.conocimientoscategorizados); */
      },
      err=>{
        console.log(err);
      }
    );
  }

  restoreConocimiento():void{
    this.ConocimientoMessage="Cargando...";
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

  cargarIdiomas():void{
    this.idiomaMessage="Cargando...";
    this.idiomaService.verTodos().subscribe(
      data=>{
        this.idiomas=data;
        this.idiomaMessage= '';
        setTimeout(()=>{
          this.idiomaMessage="";
        },3000);
         //si esta vacio debe ser restaurado
         if(data.length==0){
          this.restoreIdioma();
        }
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

  restoreIdioma():void{
    this.idiomaMessage="Cargando...";
    this.idiomaService.restaurar().subscribe(
      ()=>{
        this.idiomaMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.idiomaMessage="";
        },3000);
        this.cargarIdiomas();
      },
      err=>{
        this.idiomaMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.idiomaMessage="";
        },3000);
      }
    );
  }

  cargarskills():void{
    this.skillMessage="Cargando...";
      this.SkillService.verTodos().subscribe(
        data=>{
          this.skills=data;
          this.skillMessage= '';
          setTimeout(()=>{
            this.skillMessage="";
          },3000);
           //si esta vacio debe ser restaurado
        if(data.length==0){
          this.restoreSkill();
        }
        },
        err=>{
          console.log(err);
          this.skillMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
          setTimeout(()=>{
            this.skillMessage="";
          },3000);
        }
      );
    }

    restoreSkill():void{
      this.skillMessage="Cargando...";
      this.SkillService.restaurar().subscribe(
        ()=>{
          this.skillMessage='Restaurado correctamente';
          setTimeout(()=>{
            this.skillMessage="";
          },3000);
          this.cargarskills();
        },
        err=>{
          this.skillMessage=`Error al restaurar. Error: ${err}`;
          setTimeout(()=>{
            this.skillMessage="";
          },3000);
        }
      );
    }

    cargarTextomains():void{
      this.TextomainMessage="Cargando...";
      this.textomainService.verTodos().subscribe(
        data=>{
          if(data.length==0){
            this.restoreTextomain();
          }
          else{
            this.Textomains=data[0];
          }
          this.TextomainMessage= '';
        },
        err=>{
          console.log(err);
          this.TextomainMessage= 'Error al cargar los datos, espere unos momentos y vuelva a intentarlo';
          setTimeout(()=>{
            this.TextomainMessage="";
          },10000);
        }
      );
    }

    restoreTextomain():void{
      this.TextomainMessage="Cargando...";
      this.textomainService.restaurar().subscribe(
        ()=>{
          this.TextomainMessage='Restaurado correctamente';
          setTimeout(()=>{
            this.TextomainMessage="";
          },3000);
          this.cargarTextomains();
        },
        err=>{
          this.TextomainMessage=`Error al restaurar. Error: ${err}`;
          setTimeout(()=>{
            this.TextomainMessage="";
          },3000);
        }
      );
    }
}
