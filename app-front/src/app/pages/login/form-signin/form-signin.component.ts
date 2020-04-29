import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteHttpService } from 'src/app/shared/services/note-http.service';
import { User } from 'src/app/shared/models/user';
import { NotesValidatorsService } from 'src/app/shared/services/notes-validators.service';
import { MensagemErroSignin } from 'src/app/shared/models/mensagem-erro-signin';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { tap, concatMap, debounceTime, delay, debounce, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of, combineLatest, forkJoin } from 'rxjs';
import * as fromLogin from '../state';
import * as loginActions from '../state/login.actions';
import * as fromRoot from '../../../state/app.state';
import { Store, select } from '@ngrx/store';

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
  public counter:number = 3000;

  constructor(private store:Store<fromRoot.State>,
              private formBuilder:FormBuilder, 
              private http:NoteHttpService, 
              private router:Router,
              private authService: AuthService,
              private noteValidators:NotesValidatorsService ) { }

  ngOnInit() {
    this.generateForm();
    console.log(this.signinForm);
    combineLatest([
      this.store.pipe(select(fromLogin.getSigninName)),
      this.store.pipe(select(fromLogin.getSigninEmail)),
      this.store.pipe(select(fromLogin.getSigninPassword)),
      this.store.pipe(select(fromLogin.getSigninPasswordRepeat))
    ]).pipe(
      // debounceTime(1000),
      // distinctUntilChanged(),
      tap(([name, email, password, repeat]) => {
        this.signinForm.get('userName').setValue(name);
        this.signinForm.get('userEmail').setValue(email);
        this.signinForm.get('userPassword').get('password').setValue(password);
        this.signinForm.get('userPassword').get('repeat').setValue(repeat);
      }),
      tap( password => console.log(password)),
    ).subscribe(console.log);
    // forkJoin([
    //   this.store.pipe(select(fromLogin.getSigninPassword)),
    //   this.store.pipe(select(fromLogin.getSigninPasswordRepeat))
    // ]).pipe(
    //   tap(([password, repeat]) => console.log(password, repeat))
    // )

    //apenas para debug  
    this.signinForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((form) => {
        this.store.dispatch( new loginActions.SigninName(form.userName));
        this.store.dispatch( new loginActions.SigninEmail(form.userEmail));
        this.store.dispatch( new loginActions.SigninPassword(form.userPassword.password));
        this.store.dispatch( new loginActions.SigninPasswordRepeat(form.userPassword.repeat));
        return of(true);
      }) 
    ).subscribe();

  }

  public submitSignIn(): void {
    let user = new User();
    user.nome = this.signinForm.value.userName;
    user.email = this.signinForm.value.userEmail;
    user.senha = this.signinForm.value.userPassword.password;
    this.http.postNewUser(user).pipe(
      concatMap((flag) => {
        if(flag){
          this.authService.setUserActive(user);
          this.signinSucess = true;
          this.resetForm();
          this.timer();
        } else {
          this.signinSucess = false;
        }
        return of(flag);
      }),
      delay(3000)
    ).subscribe((flag) => {
      if(flag){
          this.router.navigate(['board']);
        }
    });
  }

  private generateForm(): void {
    this.signinForm = this.formBuilder.group({
      userName:[null, [Validators.required, Validators.minLength(3)]],
      userEmail:[null, [Validators.email,Validators.required], [this.noteValidators.emailCheckValidator(true)]],
      userPassword: this.formBuilder.group({
        password:[null, Validators.required], //minlength
        repeat:[null, Validators.required]  //minlength
      },{validator: this.noteValidators.checkMatchPassword('password', 'repeat')}
      )
    })
  }

  private resetForm(): void {
    this.signinForm.reset();
  }

  private timer(): void {
      setInterval(()=>{
          this.counter  = this.counter - 1000;
      }, 1000)
  }

  public showForm(): void {
    console.log(this.signinForm.get("userEmail").hasError("checkEmail"));
  }

}
