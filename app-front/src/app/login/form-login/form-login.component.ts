import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { NoteHttpService } from 'src/app/note-http.service';
import { NotesValidatorsService } from 'src/app/notes-validators.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MensagemErro } from 'src/app/model/mensagem-erro';

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

      if(!this.loginForm.valid ){ 
        return;
      }
      this.service.checkUser(user).subscribe(
        (res) => {
          switch (res.response) {
            case "OK":
              
              this.authService.setLoggedStatus(true);
              this.authService.getUserLogged(user.email);
              this.resetLogin();          
              setTimeout(
                ()=>{
                  this.routerBuider.navigate(['board']);     
                }, 1000
              )
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
