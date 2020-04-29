import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormSigninComponent } from './form-signin/form-signin.component';
import { FormLoginComponent } from './form-login/form-login.component';



const routes: Routes = [
  { 
    path:'', 
    component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path:'login',
        component: FormLoginComponent
      },
      {
        path: 'signin',
        component: FormSigninComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
