import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteHttpService } from 'src/app/shared/services/note-http.service';
import { User } from 'src/app/shared/models/user';
import { NotesValidatorsService } from 'src/app/shared/services/notes-validators.service';
import { MensagemErroSignin } from 'src/app/shared/models/mensagem-erro-signin';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrls: ['./form-signin.component.scss']
})
export class FormSigninComponent implements OnInit {

  public signinForm:FormGroup;
  public mensagemErro:MensagemErroSignin = new MensagemErroSignin(
                                              "Insira seu email", 
                                              "Insira sua senha", 
                                              "Insira seu nome", 
                                              "Repita sua senha");
  public signinSucess:boolean = undefined;
  constructor(private formBuilder:FormBuilder, 
              private http:NoteHttpService, 
              private router:Router,
              private authService: AuthService,
              private noteValidators:NotesValidatorsService ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      userName:[null, [Validators.required, Validators.minLength(3)]],
      userEmail:[null, [Validators.email,Validators.required], [this.noteValidators.emailCheckValidator(true)]],
      userPassword: this.formBuilder.group({
        password:[null, Validators.required],
        repeat:[null, Validators.required]
      }, {validator: this.noteValidators.checkMatchPassword('password', 'repeat')}
      )
    })
  }

  public submitSignIn(): void {
    let user = new User();
    user.nome = this.signinForm.value.userName;
    user.email = this.signinForm.value.userEmail;
    user.senha = this.signinForm.value.userPassword.password;
    this.http.postNewUser(user).subscribe(
      (data)=>{
        if(data){
          this.resetForm();
          this.signinSucess = true;
        } else {
          this.signinSucess = false;
        }
      },(error) => {
        console.log(error);
      }
    );
  }
  public resetForm(): void {
    this.signinForm.reset();
  }

  public showForm(): void {
    console.log(this.signinForm.get("userEmail").hasError("checkEmail"));
  }

}
