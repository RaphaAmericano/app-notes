import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotesValidatorsService } from '../notes-validators.service';
import { NoteHttpService } from '../note-http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public activeUser:User;
  public profileForm:FormGroup;
  constructor(
    private authService:AuthService, 
    private builder:FormBuilder,
    private noteValidators:NotesValidatorsService,
    private noteHttp:NoteHttpService) { }

  ngOnInit() {
    this.activeUser = this.authService.getUserActive();
    console.log(this.activeUser);
    this.profileForm = this.builder.group({
      userName:[this.activeUser.nome],
      userEmail:[this.activeUser.email ],
      userPassword: this.builder.group({
        password:[null],
        repeat:[null]
      }, {validator: this.noteValidators.checkMatchPassword('password', 'repeat')})
    })
  }

  public submitLogin():void {
    const user:User = new User();
    user.id = this.activeUser.id;
    user.nome = this.profileForm.get('userName').value;
    user.email = this.profileForm.get('userEmail').value;
    this.noteHttp.updateUser(user).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    )
  }

}
