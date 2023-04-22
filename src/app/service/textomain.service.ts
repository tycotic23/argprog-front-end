import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Textomain } from '../models/textomain';

@Injectable({
  providedIn: 'root'
})
export class TextomainService {
  textomainURL="https://probando2backend3.onrender.com";
  //textomainURL="http://localhost:8080/textosmain/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Textomain[]>{
      return this.httpClient.get<Textomain[]>(this.textomainURL+'traer');
  }

  public buscar(id:number):Observable<Textomain>{
    return this.httpClient.get<Textomain>(this.textomainURL+`traer/${id}`);
  }

  public crear(textomain:Textomain):Observable<Textomain>{
    return this.httpClient.post<Textomain>(this.textomainURL+`crear`,textomain);
  }

  public eliminar(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.textomainURL+`eliminar/${id}`);
  }

  public editar(id:number,textomain:Textomain):Observable<Textomain>{
    return this.httpClient.put<Textomain>(this.textomainURL+`editar/${id}`,textomain);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.textomainURL+`restore`);
  }
}
