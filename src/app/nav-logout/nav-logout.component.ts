import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-nav-logout',
  templateUrl: './nav-logout.component.html',
  styleUrls: ['./nav-logout.component.css']
})
export class NavLogoutComponent {

  isLogged=false;
  constructor(private tokenService:TokenService,private router:Router){}
  ngOnInit(){
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }
    else{
      this.isLogged=false;
    }
  }

  OnLogOut():void{
    this.tokenService.logOut();
    this.router.navigate(['']);
  }

}
