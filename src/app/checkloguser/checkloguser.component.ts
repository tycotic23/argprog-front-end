import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-checkloguser',
  templateUrl: './checkloguser.component.html',
  styleUrls: ['./checkloguser.component.css']
})
export class CheckloguserComponent {
  isLogged=false;
  constructor(private tokenService:TokenService,private router:Router){}
  ngOnInit(){
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }
    else{
      this.isLogged=false;
      this.router.navigate(['']);
    }
  }
}
