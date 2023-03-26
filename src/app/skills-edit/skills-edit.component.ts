import { Component } from '@angular/core';
import { Skill } from '../models/skill';
import { SkillService } from '../service/skill.service';

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.css']
})
export class SkillsEditComponent {
  skills: Skill[]=[];
  newSkill:boolean=false;
  newSkillName:string="";
  skillCreatedError:string="";
  enProceso:boolean=false;
  skillMessage:string="";
  editSkill:boolean=false;
  editSkillName:string="";
  editSkillSelected:string="";

  constructor(private SkillService:SkillService){ }

  ngOnInit(){
    this.cargarskills();
  }

  cargarskills():void{
  this.skillMessage="Espere mientras cargan los datos, puede demorar";
    this.SkillService.verTodos().subscribe(
      data=>{
        this.skills=data;
        this.skillMessage= '';
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
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

  //al tocarl el boton Nuevo Skill
  onNewSkill():void{
      this.newSkill=!this.newSkill;
      this.skillCreatedError= '';
      this.newSkillName="";
      this.skillMessage="";
  }

  //al tocar el boton crear del elemento que aparece al crear nuevo Skill
  onCreateSkill():void{
    if(this.newSkillName=="" ||
     this.newSkillName.length>20)
    {
      this.skillCreatedError="Error en los campos";
      setTimeout(()=>{
        this.skillCreatedError="";
      },3000);
    }
    else{
      this.enProceso=true;
      this.skillCreatedError= `Creando objeto...`;
      const skill:Skill=new Skill (this.newSkillName);
      this.SkillService.crear(skill).subscribe(
        ()=>{
          this.skillMessage= 'Creado correctamente';
          setTimeout(()=>{
            this.skillMessage="";
          },3000);
          this.cargarskills();
          this.newSkill=false;
          this.enProceso=false;
        },
        err=>{
          this.skillCreatedError= `No se puede crear. Error: ${err}`;
          setTimeout(()=>{
            this.skillCreatedError="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  borrarSkill(skill:string):void{
    this.enProceso=true;
    this.skillMessage="Eliminando objeto...";
    this.SkillService.eliminar(skill).subscribe(
      data=>{
        this.cargarskills();
        this.skillMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
        this.enProceso=false;
      },
      err=>{
        this.skillMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }

  showEditarSkill(skill:Skill):void{
    this.editSkillName=skill.skill;
    this.editSkill=true;
    this.editSkillSelected=skill.skill;
    this.skillMessage='';
  }

  hiddenEditarSkill():void{
    this.editSkillName="";
    this.editSkill=false;
    this.editSkillSelected="";
  }

  editarSkill(skill:string):void{
    if(this.editSkillName=="" ||
     this.editSkillName.length>20)
    {
      this.skillMessage="Error en los campos";
      setTimeout(()=>{
        this.skillMessage="";
      },3000);
    }
    else{
      this.enProceso=true;
      this.skillMessage="Modificando objeto...";
      this.SkillService.editar(skill,new Skill(this.editSkillName)).subscribe(
        data=>{
          this.skillMessage="Editado correctamente";
          setTimeout(()=>{
            this.skillMessage="";
          },3000);
          this.hiddenEditarSkill();
          this.cargarskills();
          this.enProceso=false;
        },
        err=>{
          this.skillMessage=`No se puede eliminar. Error: ${err}`;
          setTimeout(()=>{
            this.skillMessage="";
          },3000);
          this.enProceso=false;
        }
      );
    }
  }

  restoreSkill():void{
    this.enProceso=true;
    this.skillMessage="Restaurando... Esperar mientras se completa el pedido";
    this.SkillService.restaurar().subscribe(
      ()=>{
        this.skillMessage='Restaurado correctamente';
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
        this.cargarskills();
        this.enProceso=false;
      },
      err=>{
        this.skillMessage=`Error al restaurar. Error: ${err}`;
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
        this.enProceso=false;
      }
    );
  }
}
