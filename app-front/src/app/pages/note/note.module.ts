import { NgModule } from '@angular/core';
import { NoteComponent } from './note.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteRoutingModule } from './note-router.module';
import { NoteBoardComponent } from './note-board/note-board.component';
import { NoteListComponent } from './note-list/note-list.component';



@NgModule({
  declarations: [NoteComponent, NoteBoardComponent, NoteListComponent],
  imports: [
    SharedModule,
    NoteRoutingModule
  ]
})
export class NoteModule { }
