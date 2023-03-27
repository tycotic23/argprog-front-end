import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent{

  isLogged:boolean=false;
  isLoginFail:boolean=false;
  loginUsuario:LoginUsuario=new LoginUsuario("","");
  nombreUsuario:string="";
  password:string="";
  roles:string[]=[];
  errMsj:string="";

  constructor(private router:Router, private tokenService:TokenService, private authService:AuthService){ 
  }

  ngOnInit(){
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();
      this.router.navigate(['/home']);
    }
  }

  onLogin():void{
    this.errMsj=`Autenticando...Puede tardar la primera vez`;
    this.loginUsuario=new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data=>{
        this.isLogged=true;
        this.isLoginFail=false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles=data.authorities;

        this.errMsj=`Redirigiendo a la página principal`;
        setTimeout(()=>{
          this.errMsj="";
        },10000);
        this.router.navigate(['/home']);
      },
      err=>{
        this.isLogged=false;
        this.isLoginFail=true;
        this.errMsj=`Usuario o contraseña incorrectos`;
        setTimeout(()=>{
          this.errMsj="";
        },10000);
      }
    );
  }
}
