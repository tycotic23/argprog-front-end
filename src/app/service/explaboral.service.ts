import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Explaboral } from '../models/explaboral';

@Injectable({
  providedIn: 'root'
})
export class ExplaboralService {
  explaboralURL="http://localhost:8080/explaborales/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Explaboral[]>{
      return this.httpClient.get<Explaboral[]>(this.explaboralURL+'traer');
  }

  public buscar(id:number):Observable<Explaboral>{
    return this.httpClient.get<Explaboral>(this.explaboralURL+`traer/${id}`);
  }

  public crear(explaboral:Explaboral):Observable<Explaboral>{
    return this.httpClient.post<Explaboral>(this.explaboralURL+`crear`,explaboral);
  }

  public eliminar(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.explaboralURL+`eliminar/${id}`);
  }

  public editar(id:number,explaboral:Explaboral):Observable<Explaboral>{
    return this.httpClient.put<Explaboral>(this.explaboralURL+`editar/${id}`,explaboral);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.explaboralURL+`restore`);
  }
}
