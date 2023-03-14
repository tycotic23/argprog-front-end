import { Component } from '@angular/core';
import { Idioma } from '../models/idioma';
import { IdiomaService } from '../service/idioma.service';
import { NewIdiomaComponent } from '../new-idioma/new-idioma.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-index',
  templateUrl: './edit-index.component.html',
  styleUrls: ['./edit-index.component.css'],
})
export class EditIndexComponent {

  idiomas: Idioma[]=[];
  newIdioma:boolean=false;
  newIdiomaName:string="";
  newIdiomaNivel:number=0;
  idiomaCreatedError:string="";
  idiomaMessage:string="";
  editIdioma:boolean=false;
  editIdiomaName:string="";
  editIdiomaNivel:number=0;
  editIdiomaSelected:string="";

  constructor(private idiomaService:IdiomaService, private router:Router){ }

  ngOnInit(){
    this.cargarIdiomas();
  }

  cargarIdiomas():void{
    this.idiomaService.verTodos().subscribe(
      data=>{
        this.idiomas=data;
      },
      err=>{
        console.log(err);
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
    const idioma:Idioma=new Idioma (this.newIdiomaName,this.newIdiomaNivel);
    this.idiomaService.crear(idioma).subscribe(
      ()=>{
        this.router.navigate(['/edit-index']);
        this.idiomaMessage= 'Creado correctamente';
        this.cargarIdiomas();
        this.newIdioma=false;
      },
      err=>{
        this.idiomaCreatedError= `No se puede crear. Error: ${err}`;
      }
    );
  }

  borrarIdioma(idioma:string):void{
    this.idiomaService.eliminar(idioma).subscribe(
      data=>{
        this.cargarIdiomas();
        this.idiomaMessage="Eliminado correctamente";
      },
      err=>{
        this.idiomaMessage=`No se puede eliminar. Error: ${err}`;
      }
    );
  }

  showEditarIdioma(idioma:Idioma):void{
    this.editIdiomaName=idioma.idioma;
    this.editIdiomaNivel=idioma.nivel;
    this.editIdioma=true;
    this.editIdiomaSelected=idioma.idioma;
  }

  hiddenEditarIdioma():void{
    this.editIdiomaName="";
    this.editIdiomaNivel=0;
    this.editIdioma=false;
    this.editIdiomaSelected="";
  }

  isIdiomatoEdit(idioma:string):boolean{
      return idioma==this.editIdiomaName;
  }

  editarIdioma(idioma:string){
    this.idiomaService.editar(idioma,new Idioma(this.editIdiomaName,this.editIdiomaNivel)).subscribe(
      data=>{
        this.idiomaMessage="Editado correctamente";
        this.hiddenEditarIdioma();
        this.cargarIdiomas();
      },
      err=>{
        this.idiomaMessage=`No se puede eliminar. Error: ${err}`;
      }
    );
  }

}
