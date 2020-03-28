import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesValidatorsService } from '../../shared/services/notes-validators.service';
import { NoteHttpService } from '../../shared/services/note-http.service';
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

    this.authService.getUserActive().subscribe(
      user => {
        this.activeUser = user
      }
    )

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
    const user:User = this.activeUser;
    user.nome = this.profileForm.get('userName').value;
    user.email = this.profileForm.get('userEmail').value;
    this.noteHttp.updateUser(user).subscribe(
      (res) => {
        if(res){
          this.updateSuccess = true;
          this.authService.setUserActive(user);
        }
        //Escrever um else para mensagens
      },
      (error) => console.log(error)
    )
  
  }

  public submitNewPassword(): void{
    const user:User = this.activeUser;
    user.senha = this.userPassword.get('password').value;
    this.noteHttp.updateUserPassword(user).subscribe(
      (res) => {
        if(res){
          this.passworUpdateSuccess = true;
          this.authService.setUserActive(user);
          this.userPassword.reset();
        }
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
        if(res){
          this.deleteForm.reset();
          this.deleteUserSuccess = true;
          this.authService.logoutAuth().subscribe(
            () => this.router.navigateByUrl('login')
          );
        }
      },
      (error) => console.log(error)
    )
  }



}
