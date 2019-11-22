import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { NoteHttpService } from 'src/app/note-http.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  public loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private service:NoteHttpService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userEmail:[null, [Validators.required]],
      userPassword:[null, [Validators.required]]
    });
  }

  public submitLogin(): void {
    // let user = new User();
    // user.email = this.loginForm.value.userEmail;
    // user.senha = this.loginForm.value.userPassword;
    // console.log(user);
    // this.service.checkUser(user).toPromise().then(
    //   (res) => {
    //     console.log(res);
    //   }
    // )
  }

}
