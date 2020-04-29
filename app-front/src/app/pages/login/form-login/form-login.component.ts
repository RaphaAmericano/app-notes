import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { NoteHttpService } from 'src/app/shared/services/note-http.service';
import { NotesValidatorsService } from 'src/app/shared/services/notes-validators.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MensagemErro } from 'src/app/shared/models/mensagem-erro';
import { concatMap, distinctUntilChanged, switchMap, tap, debounceTime, map  } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromLogin from '../state'; //index.ts
import * as loginActions from '../state/login.actions';
import * as fromRoot from '../../../state/app.state';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  public loginForm:FormGroup;
  public mensagemErro:MensagemErro = new MensagemErro("Insira seu email", "Insira sua senha");
  constructor(
              private store:Store<fromRoot.State>,
              private formBuilder:FormBuilder, 
              private service:NoteHttpService, 
              private noteValidators:NotesValidatorsService, 
              private routerBuider:Router,
              private authService:AuthService) { }

  ngOnInit() {
    this.generateForm();
    this.store.pipe(
      select(fromLogin.getLoginEmail),
      concatMap((email) => {
        this.loginForm.get('userEmail').setValue(email);
        return of(email);
      })
    ).subscribe();

    this.store.pipe(
      select(fromLogin.getLoginPassword),
      concatMap((password) => {
        this.loginForm.get('userPassword').setValue(password);
        return of(password);
      })
    ).subscribe();
    ////
    this.loginForm.get('userEmail').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val) => { 
          this.store.dispatch(new loginActions.LoginEmail(val));
          return of(true);
        }
      )
    ).subscribe(console.log);

    this.loginForm.get('userPassword').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val) => { 
          this.store.dispatch(new loginActions.LoginPassword(val));
          return of(true);
        }
      )
    )
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
