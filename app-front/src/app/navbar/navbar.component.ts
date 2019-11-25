import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
    console.log(localStorage);
  }

}
