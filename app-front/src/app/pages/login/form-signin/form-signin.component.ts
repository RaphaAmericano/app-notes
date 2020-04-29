import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteHttpService } from 'src/app/shared/services/note-http.service';
import { User } from 'src/app/shared/models/user';
import { NotesValidatorsService } from 'src/app/shared/services/notes-validators.service';
import { MensagemErroSignin } from 'src/app/shared/models/mensagem-erro-signin';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { tap, concatMap, debounceTime, delay } from 'rxjs/operators';
import { of } from 'rxjs';

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
    this.http.postNewUser(user).pipe(
      tap((flag) => console.log(flag)),
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
