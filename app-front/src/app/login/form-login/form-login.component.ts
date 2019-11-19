import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  public loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userEmail:[null, [Validators.required]],
      userPassword:[null, [Validators.required]]
    });
  }

  public submitLogin(): void {
    // for(const i in this.loginForm.controls){
    //   this.loginForm.contains[i].markAsDirty();
    //   this.loginForm.contains[i].updateValueAndValidity();
    // }
  }

}
