import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges{
  
  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(){
    if(this.authService.getLoggedStatus()){
      this.router.navigate(['board']);
    }
  }

  ngOnChanges(changes:any ){
    console.log(changes);
  }
}
