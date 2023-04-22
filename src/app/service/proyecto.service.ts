import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyectoURL="https://probando2backend3.onrender.com/proyectos/";
  //proyectoURL="http://localhost:8080/proyectos/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Proyecto[]>{
      return this.httpClient.get<Proyecto[]>(this.proyectoURL+'traer');
  }

  public buscar(id:number):Observable<Proyecto>{
    return this.httpClient.get<Proyecto>(this.proyectoURL+`traer/${id}`);
  }

  public crear(proyecto:Proyecto):Observable<Proyecto>{
    return this.httpClient.post<Proyecto>(this.proyectoURL+`crear`,proyecto);
  }

  public eliminar(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.proyectoURL+`eliminar/${id}`);
  }

  public editar(id:number,proyecto:Proyecto):Observable<Proyecto>{
    return this.httpClient.put<Proyecto>(this.proyectoURL+`editar/${id}`,proyecto);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.proyectoURL+`restore`);
  }
}
