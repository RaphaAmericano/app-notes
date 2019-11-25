import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { NoteComponent } from './note/note.component';


const routes: Routes = [
  
  { path:'login', component:  LoginComponent},
  { path:'board', component:  NoteComponent, canActivate:[AuthGuardGuard]},
  { path:'', redirectTo:'/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
