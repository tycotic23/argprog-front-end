import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  contactoURL="https://backendnew-ox1g.onrender.com/contactos/";
  //contactoURL="http://localhost:8080/contactos/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Contacto[]>{
      return this.httpClient.get<Contacto[]>(this.contactoURL+'traer');
  }

  public buscar(nombre:string):Observable<Contacto>{
    return this.httpClient.get<Contacto>(this.contactoURL+`traer/${nombre}`);
  }

  public crear(contacto:Contacto):Observable<Contacto>{
    return this.httpClient.post<Contacto>(this.contactoURL+`crear`,contacto);
  }

  public eliminar(nombre:string):Observable<any>{
    return this.httpClient.delete<any>(this.contactoURL+`eliminar/${nombre}`);
  }

  public editar(nombre:string,contacto:Contacto):Observable<Contacto>{
    return this.httpClient.put<Contacto>(this.contactoURL+`editar/${nombre}`,contacto);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.contactoURL+`restore`);
  }
}
