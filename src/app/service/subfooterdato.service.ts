import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subfooterdato } from '../models/subfooterdato';

@Injectable({
  providedIn: 'root'
})
export class SubfooterdatoService {
  subfooterdatoURL="http://localhost:8080/subfooterdatos/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Subfooterdato[]>{
      return this.httpClient.get<Subfooterdato[]>(this.subfooterdatoURL+'traer');
  }

  public buscar(id:number):Observable<Subfooterdato>{
    return this.httpClient.get<Subfooterdato>(this.subfooterdatoURL+`traer/${id}`);
  }

  public crear(subfooterdato:Subfooterdato):Observable<Subfooterdato>{
    return this.httpClient.post<Subfooterdato>(this.subfooterdatoURL+`crear`,subfooterdato);
  }

  public eliminar(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.subfooterdatoURL+`eliminar/${id}`);
  }

  public editar(id:number,subfooterdato:Subfooterdato):Observable<Subfooterdato>{
    return this.httpClient.put<Subfooterdato>(this.subfooterdatoURL+`editar/${id}`,subfooterdato);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.subfooterdatoURL+`restore`);
  }
}
