import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL="https://probando2backend3.onrender.com";
  //authURL="http://localhost:8080/auth/";

  constructor(private httpClient:HttpClient) { }

  public login(loginUsuario:LoginUsuario):Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL+'login',loginUsuario);
  }
}
