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
  skillMessage:string="";
  editSkill:boolean=false;
  editSkillName:string="";
  editSkillSelected:string="";

  constructor(private SkillService:SkillService){ }

  ngOnInit(){
    this.cargarskills();
  }

  cargarskills():void{
    this.SkillService.verTodos().subscribe(
      data=>{
        this.skills=data;
      },
      err=>{
        console.log(err);
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
    const skill:Skill=new Skill (this.newSkillName);
    this.SkillService.crear(skill).subscribe(
      ()=>{
        this.skillMessage= 'Creado correctamente';
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
        this.cargarskills();
        this.newSkill=false;
      },
      err=>{
        this.skillCreatedError= `No se puede crear. Error: ${err}`;
        setTimeout(()=>{
          this.skillCreatedError="";
        },3000);
      }
    );
  }

  borrarSkill(skill:string):void{
    this.SkillService.eliminar(skill).subscribe(
      data=>{
        this.cargarskills();
        this.skillMessage="Eliminado correctamente";
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
      },
      err=>{
        this.skillMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
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
    this.SkillService.editar(skill,new Skill(this.editSkillName)).subscribe(
      data=>{
        this.skillMessage="Editado correctamente";
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
        this.hiddenEditarSkill();
        this.cargarskills();
      },
      err=>{
        this.skillMessage=`No se puede eliminar. Error: ${err}`;
        setTimeout(()=>{
          this.skillMessage="";
        },3000);
      }
    );
  }

  restoreSkill():void{
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
}
