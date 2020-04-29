import { NgModule } from '@angular/core';
import { FormLoginComponent } from './form-login/form-login.component';
import { LoginComponent } from './login.component';
import { FormSigninComponent } from './form-signin/form-signin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login-router.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../profile/state/user.effects';



@NgModule({
  declarations: [LoginComponent, FormLoginComponent, FormSigninComponent],
  imports: [
    SharedModule,
    LoginRoutingModule,
    StoreModule.forFeature('login', reducer),
    // EffectsModule.forFeature([UserEffects])
  ],
  exports:[
    LoginComponent,
    FormLoginComponent,
    FormSigninComponent
  ]
})
export class LoginModule { }
