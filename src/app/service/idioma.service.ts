import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idioma } from '../models/idioma';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
  idiomaURL="http://localhost:8080/idiomas/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Idioma[]>{
      return this.httpClient.get<Idioma[]>(this.idiomaURL+'traer');
  }

  public buscar(idioma:string):Observable<Idioma>{
    return this.httpClient.get<Idioma>(this.idiomaURL+`traer/${idioma}`);
  }

  public crear(idioma:Idioma):Observable<Idioma>{
    return this.httpClient.post<Idioma>(this.idiomaURL+`crear`,idioma);
  }

  public eliminar(idioma:string):Observable<any>{
    return this.httpClient.delete<any>(this.idiomaURL+`eliminar/${idioma}`);
  }

  public editar(anterior:string,nuevo:Idioma):Observable<Idioma>{
    return this.httpClient.put<Idioma>(this.idiomaURL+`editar/${anterior}`,nuevo);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.idiomaURL+`restore`);
  }

}
