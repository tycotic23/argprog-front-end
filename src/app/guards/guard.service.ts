import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService{

  realRol:string="";
  constructor(private tokenService:TokenService, private router: Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    const expectedRol=route.data['expectedRol'];
    const roles=this.tokenService.getAuthorities();
    this.realRol="user";
    roles.forEach(rol=>{
      if(rol=='1'){
        this.realRol="admin";
      }
    });
    if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol)===-1){
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
