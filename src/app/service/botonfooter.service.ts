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

  public buscar(logo:string):Observable<Botonfooter>{
    return this.httpClient.get<Botonfooter>(this.botonfooterURL+`traer/${logo}`);
  }

  public crear(botonfooter:Botonfooter):Observable<Botonfooter>{
    return this.httpClient.post<Botonfooter>(this.botonfooterURL+`crear`,botonfooter);
  }

  public eliminar(logo:string):Observable<any>{
    return this.httpClient.delete<any>(this.botonfooterURL+`eliminar/${logo}`);
  }

  public editar(anterior:string,nuevo:Botonfooter):Observable<Botonfooter>{
    return this.httpClient.put<Botonfooter>(this.botonfooterURL+`editar/${anterior}`,nuevo);
  }

  public restaurar():Observable<any>{
    return this.httpClient.get<any>(this.botonfooterURL+`restore`);
  }
}
