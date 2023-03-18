import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Botonfooter } from '../models/botonfooter';

@Injectable({
  providedIn: 'root'
})
export class BotonfooterService {

  botonfooterURL="http://localhost:8080/botonesfooter/";
  constructor(private httpClient:HttpClient) {  }

  //los service son el "enchufe" con la API que van a consumir
  //aqui van los metodos

  public verTodos():Observable<Botonfooter[]>{
      return this.httpClient.get<Botonfooter[]>(this.botonfooterURL+'traer');
  }

  public buscar(id:number):Observable<Botonfooter>{
    return this.httpClient.get<Botonfooter>(this.botonfooterURL+`traer/${id}`);
  }

  public crear(botonfooter:Botonfooter):Observable<Botonfooter>{
    return this.httpClient.post<Botonfooter>(this.botonfooterURL+`crear`,botonfooter);
  }

  public eliminar(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.botonfooterURL+`eliminar/${id}`);
  }

  public editar(id:number,botonfooter:Botonfooter):Observable<Botonfooter>{
    return this.httpClient.put<Botonfooter>(this.botonfooterURL+`editar/${id}`,botonfooter);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.botonfooterURL+`restore`);
  }
}
