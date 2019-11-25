import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoteBoardComponent } from './note-board/note-board.component';
import { AuthGuardGuard } from './auth-guard.guard';


const routes: Routes = [
  
  { path:'login', component:  LoginComponent},
  { path:'board', component:  NoteBoardComponent, canActivate:[AuthGuardGuard]},
  { path:'', redirectTo:'/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
