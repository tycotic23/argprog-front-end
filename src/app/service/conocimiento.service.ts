import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
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

  public verCategorias():Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(this.conocimientoURL+'traercategorias');
}

  public buscar(id:number):Observable<Conocimiento>{
    return this.httpClient.get<Conocimiento>(this.conocimientoURL+`traer/${id}`);
  }

  public buscarCategoria(id:number):Observable<Categoria>{
    return this.httpClient.get<Categoria>(this.conocimientoURL+`traercategoria/${id}`);
  }

  public buscarCategoriaPorNombre(nombre:string):Observable<Categoria>{
    return this.httpClient.get<Categoria>(this.conocimientoURL+`traercategoriabynombre/${nombre}`);
  }

  public crearCategoria(categoria:Categoria):Observable<Categoria>{
    return this.httpClient.post<Categoria>(this.conocimientoURL+`crearcategoria`,categoria);
  }

  public crear(conocimiento:Conocimiento):Observable<Conocimiento>{
    return this.httpClient.post<Conocimiento>(this.conocimientoURL+`crear`,conocimiento);
  }

  public eliminar(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.conocimientoURL+`eliminar/${id}`);
  }

  public eliminarCategoria(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.conocimientoURL+`eliminarcategoria/${id}`);
  }

  public editar(id:number,conocimiento:Conocimiento):Observable<Conocimiento>{
    return this.httpClient.put<Conocimiento>(this.conocimientoURL+`editar/${id}`,conocimiento);
  }

  public editarCategoria(id:number,categoria:Categoria):Observable<Categoria>{
    return this.httpClient.put<Categoria>(this.conocimientoURL+`editarcategoria/${id}`,categoria);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.conocimientoURL+`restore`);
  }
}
