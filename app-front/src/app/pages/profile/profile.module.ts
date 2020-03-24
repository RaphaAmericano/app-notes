import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from './profile-router.module';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  exports:[
    ProfileComponent
  ]
})
export class ProfileModule { }
