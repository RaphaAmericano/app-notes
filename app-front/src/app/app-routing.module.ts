import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { 
    path:'welcome', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  { 
    path:'board', 
    loadChildren: () => import('./pages/note/note.module').then(m => m.NoteModule ),
    // canActivate:[AuthGuard]
  },
  { 
    path:'profile', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    // canActivate:[AuthGuard]
  },
  { 
    path:'', 
    redirectTo:'welcome', 
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo:''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
