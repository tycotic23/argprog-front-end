import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conocimiento } from '../models/conocimiento';

@Injectable({
  providedIn: 'root'
})
export class ConocimientoService {

  conocimientoURL="http://localhost:8080/conocimientos/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Conocimiento[]>{
      return this.httpClient.get<Conocimiento[]>(this.conocimientoURL+'traer');
  }

  public buscar(nombre:string):Observable<Conocimiento>{
    return this.httpClient.get<Conocimiento>(this.conocimientoURL+`traer/${nombre}`);
  }

  public crear(conocimiento:Conocimiento):Observable<Conocimiento>{
    return this.httpClient.post<Conocimiento>(this.conocimientoURL+`crear`,conocimiento);
  }

  public eliminar(nombre:string):Observable<any>{
    return this.httpClient.delete<any>(this.conocimientoURL+`eliminar/${nombre}`);
  }

  public editar(nombre:string,conocimiento:Conocimiento):Observable<Conocimiento>{
    return this.httpClient.put<Conocimiento>(this.conocimientoURL+`editar/${nombre}`,conocimiento);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.conocimientoURL+`restore`);
  }
}
