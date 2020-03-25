import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/services/auth-guard.guard';
import { NoteComponent } from './pages/note/note.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  
  { 
    path:'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  { 
    path:'board', 
    loadChildren: () => import('./pages/note/note.module').then(m => m.NoteModule )
  },
  { 
    path:'profile', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  { 
    path:'', 
    redirectTo:'login', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
