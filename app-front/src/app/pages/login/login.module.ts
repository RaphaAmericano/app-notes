import { NgModule } from '@angular/core';
import { FormLoginComponent } from './form-login/form-login.component';
import { LoginComponent } from './login.component';
import { FormSigninComponent } from './form-signin/form-signin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login-router.module';



@NgModule({
  declarations: [LoginComponent, FormLoginComponent, FormSigninComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  exports:[
    LoginComponent,
    FormLoginComponent,
    FormSigninComponent
  ]
})
export class LoginModule { }
