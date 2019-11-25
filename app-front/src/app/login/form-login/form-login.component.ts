import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { NoteHttpService } from 'src/app/note-http.service';
import { NotesValidatorsService } from 'src/app/notes-validators.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  public loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, 
              private service:NoteHttpService, 
              private noteValidatores:NotesValidatorsService, 
              private routerBuider:Router,
              private authService:AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userEmail:[null, [Validators.email, Validators.required], [this.noteValidatores.emailCheckValidator()]],
      userPassword:[null, [Validators.required, Validators.minLength(3)]]
    });
  }

  public submitLogin(): void {
    if(this.loginForm.valid){
      let user = new User();
      user.email = this.loginForm.value.userEmail;
      user.senha = this.loginForm.value.userPassword;
      console.log(user);
      console.log(this.loginForm.valid);
      if(this.loginForm.valid ){ 
        this.routerBuider.navigate(['board']);
        this.authService.setLoggedStatus(true);
        this.resetLogin();  
        return;
      }
      return; 
    }

  }

  private resetLogin(): void {
    this.loginForm.reset();
  }
}
