import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteHttpService } from 'src/app/note-http.service';
import { User } from 'src/app/model/user';
import { NotesValidatorsService } from 'src/app/notes-validators.service';
import { MensagemErroSignin } from 'src/app/model/mensagem-erro-signin';

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
  constructor(private formBuilder:FormBuilder, 
              private http:NoteHttpService, 
              private noteValidators:NotesValidatorsService ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      userName:[null, [Validators.required, Validators.minLength(3)]],
      userEmail:[null, [Validators.email,Validators.required], [this.noteValidators.emailCheckValidator(true)]],
      userPassword: this.formBuilder.group({
        password:[null, Validators.required],
        repeat:[null, Validators.required]
      }, {validator: this.noteValidators.checkMatchPassword()})
    })
  }

  public submitSignIn(): void {
    let user = new User();
    user.nome = this.signinForm.value.userName;
    user.email = this.signinForm.value.userEmail;
    user.senha = this.signinForm.value.userPassword.password;
    this.http.postNewUser(user).subscribe(
      (data)=>{
        console.log(data);
         
      },(error) => {
        console.log(error);
      }
    );
  }
  public resetForm(): void {
    this.signinForm.reset();
  }

}
