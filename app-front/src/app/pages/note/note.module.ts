import { NgModule } from '@angular/core';
import { NoteComponent } from './note.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteRoutingModule } from './note-router.module';



@NgModule({
  declarations: [NoteComponent],
  imports: [
    SharedModule,
    NoteRoutingModule
  ],
  exports:[
    NoteComponent
  ]
})
export class NoteModule { }
