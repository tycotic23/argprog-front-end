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
        this.cargarskills();
        this.newSkill=false;
      },
      err=>{
        this.skillCreatedError= `No se puede crear. Error: ${err}`;
      }
    );
  }

  borrarSkill(skill:string):void{
    this.SkillService.eliminar(skill).subscribe(
      data=>{
        this.cargarskills();
        this.skillMessage="Eliminado correctamente";
      },
      err=>{
        this.skillMessage=`No se puede eliminar. Error: ${err}`;
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

  isSkilltoEdit(skill:string):boolean{
      return skill==this.editSkillName;
  }

  editarSkill(skill:string):void{
    this.SkillService.editar(skill,new Skill(this.editSkillName)).subscribe(
      data=>{
        this.skillMessage="Editado correctamente";
        this.hiddenEditarSkill();
        this.cargarskills();
      },
      err=>{
        this.skillMessage=`No se puede eliminar. Error: ${err}`;
      }
    );
  }

  restoreSkill():void{
    this.SkillService.restaurar().subscribe(
      ()=>{
        this.skillMessage='Restaurado correctamente';
        this.cargarskills();
      },
      err=>{
        this.skillMessage=`Error al restaurar. Error: ${err}`;
      }
    );
  }
}
