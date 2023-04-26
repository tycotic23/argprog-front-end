import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  skillURL="https://backendnew-ox1g.onrender.com/skills/";
  //skillURL="http://localhost:8080/skills/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Skill[]>{
      return this.httpClient.get<Skill[]>(this.skillURL+'traer');
  }

  public buscar(skill:string):Observable<Skill>{
    return this.httpClient.get<Skill>(this.skillURL+`traer/${skill}`);
  }

  public crear(skill:Skill):Observable<any>{
    return this.httpClient.post<any>(this.skillURL+`crear`,skill);
  }

  public eliminar(skill:string):Observable<any>{
    return this.httpClient.delete<any>(this.skillURL+`eliminar/${skill}`);
  }

  public editar(anterior:string,nuevo:Skill):Observable<Skill>{
    return this.httpClient.put<Skill>(this.skillURL+`editar/${anterior}`,nuevo);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.skillURL+`restore`);
  }
}
