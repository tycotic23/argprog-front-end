import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  educacionURL="https://probando2backend3.onrender.com";
  //educacionURL="http://localhost:8080/educacion/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Educacion[]>{
      return this.httpClient.get<Educacion[]>(this.educacionURL+'traer');
  }

  public buscar(id:number):Observable<Educacion>{
    return this.httpClient.get<Educacion>(this.educacionURL+`traer/${id}`);
  }

  public crear(educacion:Educacion):Observable<Educacion>{
    return this.httpClient.post<Educacion>(this.educacionURL+`crear`,educacion);
  }

  public eliminar(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.educacionURL+`eliminar/${id}`);
  }

  public editar(id:number,educacion:Educacion):Observable<Educacion>{
    return this.httpClient.put<Educacion>(this.educacionURL+`editar/${id}`,educacion);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.educacionURL+`restore`);
  }
}
