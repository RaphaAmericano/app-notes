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
    this.authService.menuEmitter.subscribe(res => this.navMenu = res );
  }

  public logoutUser():void {
    this.authService.setLoggedStatus(false);
    this.router.navigate([''])
  }

}
