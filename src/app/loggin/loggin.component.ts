import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent {

  constructor(private router:Router){ 
  }
  ngOnInit(){
  }

  loggearse():void{
    
    this.router.navigate(['/edit-index']);
  }
}
