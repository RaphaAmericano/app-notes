import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteHttpService } from 'src/app/note-http.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrls: ['./form-signin.component.scss']
})
export class FormSigninComponent implements OnInit {

  public signinForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private http:NoteHttpService ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      userName:[null, [Validators.required]],
      userEmail:[null, [Validators.required]],
      userPassword:[null, [Validators.required]],
      userPasswordConfirm:[null, [Validators.required]]
    })
  }

  public submitSignIn(): void {
    let user = new User();
    user.nome = this.signinForm.value.userName;
    user.email = this.signinForm.value.userEmail;
    user.senha = this.signinForm.value.userPassword;
    this.http.postNewUser(user).toPromise().then(
      (res) => {
        console.log(res);
      }
    );
  }

  

  //todo: validator para a senha e confirmar senha

}
