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
export class ProfileComponent implements OnInit {

  public activeUser:User;
  public profileForm:FormGroup;
  public userPassword:FormGroup;
  public deleteForm:FormGroup;
  public updateSuccess:boolean = false;
  public passworUpdateSuccess:boolean = false;
  public deleteUserSuccess:boolean = false;
  constructor(
    private authService:AuthService, 
    private builder:FormBuilder,
    private router:Router,
    private noteValidators:NotesValidatorsService,
    private noteHttp:NoteHttpService) {}

  ngOnInit() {
    this.activeUser = this.authService.setUserActive();
    this.profileForm = this.builder.group({
      userName:[this.activeUser.nome],
      userEmail:[this.activeUser.email]
    })
    this.userPassword = this.builder.group({
        password:[null, Validators.required],
        repeat:[null, Validators.required]
      }, {validator: this.noteValidators.checkMatchPassword('password', 'repeat')}
    )
      this.deleteForm = this.builder.group({
        password:[null, [Validators.required], [this.noteValidators.passwordCheckValidator()]]
      })
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
    const user:User = new User();
    user.id = this.activeUser.id;
    user.senha = this.userPassword.get('password').value;
    this.noteHttp.updateUserPassword(user).subscribe(
      (res) => {
        this.passworUpdateSuccess = true;
        this.authService.getUserLogged(this.activeUser.email);
        this.userPassword.reset();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public newUpdate():void {
    this.updateSuccess = false;
  }

  public deleteUser(): void {
    this.noteHttp.deleteUser(this.activeUser).subscribe(
      (res) => { 
        this.authService.setLoggedStatus(false);
        this.deleteForm.reset();
        this.deleteUserSuccess = true;
        setTimeout(()=>{
          this.router.navigate(['login']);
        }, 4000)
      },
      (error) => console.log(error)
    )
  }

}
