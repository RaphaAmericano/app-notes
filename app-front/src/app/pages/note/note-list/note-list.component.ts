import { Component, OnInit  } from '@angular/core';
import { Note } from 'src/app/shared/models/note';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit  {

  public list_notes:Note[];
  public searchForm:FormGroup;

  constructor(private builder: FormBuilder,
      private authService: AuthService,
      private noteService:NotesService
    ) { }

  ngOnInit() {
    this.searchForm = this.builder.group({
      query:[null]
    })
    this.noteService.getListNotes().subscribe(
      notes => this.list_notes = notes 
    )

  }

  public selectNote(value:number): void{
    this.noteService.changeActiveNote(value);
  }

}
