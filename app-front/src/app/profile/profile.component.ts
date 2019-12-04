import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesValidatorsService } from '../notes-validators.service';
import { NoteHttpService } from '../note-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public activeUser:User;
  public profileForm:FormGroup;
  public userPassword:FormGroup;
  public updateSuccess:Boolean = false;
  constructor(
    private authService:AuthService, 
    private builder:FormBuilder,
    private router:Router,
    private noteValidators:NotesValidatorsService,
    private noteHttp:NoteHttpService) { }

  ngOnInit() {
    this.activeUser = this.authService.getUserActive();
    this.profileForm = this.builder.group({
      userName:[this.activeUser.nome],
      userEmail:[this.activeUser.email]
    })
    this.userPassword = this.builder.group({
        password:[null, Validators.required],
        repeat:[null, Validators.required]
      }, {validator: this.noteValidators.checkMatchPassword('password', 'repeat')}
    )
  }

  ngOnDestroy() {
    this.router.navigate(['login']);
    this.authService.clearUserLocalStorage(false);
  }

  public submitUpdate():void {
    const user:User = new User();
    user.id = this.activeUser.id;
    user.nome = this.profileForm.get('userName').value;
    user.email = this.profileForm.get('userEmail').value;
    this.noteHttp.updateUser(user).subscribe(
      (res) => {
        this.updateSuccess = true;
      },
      (error) => console.log(error)
    )
    this.authService.getUserLogged(user.email);
    
  }

  public submitNewPassword(): void{
    
  }

  public newUpdate():void {
    this.updateSuccess = false;
  }

  public deleteUser(): void {
    this.noteHttp.deleteUser(this.activeUser).subscribe(
      (res) => { 
        console.log(res);
      },
      (error) => console.log(error)
    )
  }

}
