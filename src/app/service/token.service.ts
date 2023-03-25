import { Injectable } from '@angular/core';

//estos valores se almacenan en el navegador
const TOKEN_KEY:string='AuthToken';
const USERNAME_KEY:string='AuthUserName';
const AUTHORITIES_KEY:string='AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

roles:Array<string> =[];

  constructor() { }

  public setToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(){
      return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,userName);
  }

  public getUserName(){
    return window.sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities:string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }

  public getAuthorities(){
    this.roles=[];
    let authorities=sessionStorage.getItem(AUTHORITIES_KEY);
    if (authorities!=null){

      JSON.parse(authorities,(authority)=>{
        this.roles.push(authority);
      });
    }
    return this.roles;
  }

  public logOut():void{
    window.sessionStorage.clear();
  }
}
