import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { Note } from '../../shared/models/note';
import { NoteHttpService } from '../../shared/services/note-http.service';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  public userLogged:User;

  constructor(
    private authService: AuthService, 
    private noteService:NotesService) {}

  ngOnInit() {
      // this.authService.getUserActive().subscribe(
      //   user => this.userLogged = user
      // )
      //this.noteService.loadNotes();
      
  }

}
