import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { NoteHttpService } from 'src/app/shared/services/note-http.service';
import { NotesValidatorsService } from 'src/app/shared/services/notes-validators.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MensagemErro } from 'src/app/shared/models/mensagem-erro';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  public loginForm:FormGroup;
  public mensagemErro:MensagemErro = new MensagemErro("Insira seu email", "Insira sua senha");

  constructor(private formBuilder:FormBuilder, 
              private service:NoteHttpService, 
              private noteValidators:NotesValidatorsService, 
              private routerBuider:Router,
              private authService:AuthService) { }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm(): void {
    this.loginForm = this.formBuilder.group({
      userEmail:[null, [Validators.email, Validators.required], [this.noteValidators.emailCheckValidator(false)]],
      userPassword:[null, [Validators.required, Validators.minLength(3)]]
    });
  }

  public submitLogin(): void {
    if(this.loginForm.valid){

      let user = new User();
      user.email = this.loginForm.value.userEmail;
      user.senha = this.loginForm.value.userPassword;

      this.service.checkUser(user).subscribe(
        (res) => {
          console.log(res);
          switch (res.response) {
            case "OK":
              user.id = parseInt(res.id);
              this.authService.setLoggedStatus(true);
              this.authService.setUserActive(user);
              this.resetLogin();          
              this.routerBuider.navigate(['board']);
              break;
            case "Email Inexistente":
              this.mensagemErro.email = res.response;
              this.loginForm.controls.userEmail.setErrors({'incorrect': true})
              break;
            case "Senha Inválida":
              this.mensagemErro.password = res.response;
              this.loginForm.controls.userPassword.setErrors({'incorrect': true});
              break;
            default:
              console.log('Erro nao identificado');
              break;
          }
        },
        (error) => {
          console.log(error);
        } 
      )
    }
  }

  private resetLogin(): void {
    this.loginForm.reset();
  }
}
