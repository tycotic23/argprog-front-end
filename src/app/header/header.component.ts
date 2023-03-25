import { Component } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  roles:string[]=[];
  isAdmin:boolean=false;

  constructor(private tokenService:TokenService){

  }

  ngOnInit(){
    this.roles=this.tokenService.getAuthorities();
    this.roles.forEach(rol=>{
      if(rol=='1'){
        this.isAdmin=true;
      }
    });
  }
}
