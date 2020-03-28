import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public navMenu:boolean = false;

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getLoggedStatus().subscribe(
      (res:boolean) => {
        this.navMenu = res 
      }
    )
  }

  public logoutUser():void {
    this.authService.logoutAuth();
    this.router.navigate(['']);
  }

}
