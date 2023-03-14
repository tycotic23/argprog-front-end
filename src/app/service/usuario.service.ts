import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioURL="http://localhost:8080/usuarios/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Usuario[]>{
      return this.httpClient.get<Usuario[]>(this.usuarioURL+'traer');
  }

  public buscar(usuario:string):Observable<Usuario>{
    return this.httpClient.get<Usuario>(this.usuarioURL+`traer/${usuario}`);
  }

  public crear(usuario:Usuario):Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.usuarioURL+`crear`,usuario);
  }

  public eliminar(usuario:string):Observable<any>{
    return this.httpClient.delete<any>(this.usuarioURL+`eliminar/${usuario}`);
  }

  public editar(usuario:string,actualizacion:Usuario):Observable<Usuario>{
    return this.httpClient.put<Usuario>(this.usuarioURL+`editar/${usuario}`,actualizacion);
  }
}
