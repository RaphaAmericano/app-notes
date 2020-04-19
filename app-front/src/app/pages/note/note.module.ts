import { NgModule } from '@angular/core';
import { NoteComponent } from './note.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteRoutingModule } from './note-router.module';
import { NoteBoardComponent } from './note-board/note-board.component';
import { NoteListComponent } from './note-list/note-list.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/note.reducer';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [NoteComponent, NoteBoardComponent, NoteListComponent],
  imports: [
    SharedModule,
    NoteRoutingModule,
    StoreModule.forFeature('notes', reducer),
    EffectsModule.forFeature([])
  ]
})
export class NoteModule { }
