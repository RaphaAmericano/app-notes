import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from './profile-router.module';
import { ProfileComponent } from './profile.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    // StoreModule.forFeature('user', reducer),
    // EffectsModule.forFeature([UserEffects])
  ],
  exports:[
    ProfileComponent
  ]
})
export class ProfileModule { }
