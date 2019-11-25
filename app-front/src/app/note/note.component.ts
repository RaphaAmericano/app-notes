import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  public userLogged:User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userLogged = this.authService.getUserActive();
    console.log(this.userLogged);
  }



}
