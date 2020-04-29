import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { NoteHttpService } from 'src/app/shared/services/note-http.service';
import { NotesValidatorsService } from 'src/app/shared/services/notes-validators.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MensagemErro } from 'src/app/shared/models/mensagem-erro';
import * as fromUser from './../../profile/state/user.state';
import * as userActions from './../../profile/state/user.actions';
import { Store } from '@ngrx/store';
import { map, takeWhile, tap, first, concatMap  } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  public loginForm:FormGroup;
  public mensagemErro:MensagemErro = new MensagemErro("Insira seu email", "Insira sua senha");
  constructor(
    // private store:Store<fromUser.State>,
              private formBuilder:FormBuilder, 
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

      this.service.checkEmail(user.email).pipe(
        concatMap((flag => {
          if(flag){
            console.log('passa o password');
            return this.service.checkUserPassword(user.senha, user.email);
          }else {
            this.loginForm.controls.userEmail.setErrors({'incorrect': true});
            return of(false);
          }
        })),
        concatMap((flag) => {
          if(flag){
            return this.service.getUserByEmail(user.email);
          } else {
            this.mensagemErro.password = "Senha incorreta";
            this.loginForm.controls.userPassword.setErrors({'incorrect': true});
            this.mensagemErro.password = "Insira sua senha";
            return of(false);
          }
        }),
        concatMap((user:User)=> {
            this.authService.setUserActive(user);
            //TODO: adicionar ao state
            return of(true);
        })
      ).subscribe((flag) => {
        if(flag) {
          this.resetLogin();
          this.routerBuider.navigate(['board'])
        } else {
          this.mensagemErro.unknown = "Ocorreu um erro. Tente novamente"; 
        }
      })
    }
  }

  private resetLogin(): void {
    this.loginForm.reset();
  }
}
