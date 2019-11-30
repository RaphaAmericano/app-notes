import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { Note } from '../model/note';
import { NoteHttpService } from '../note-http.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnChanges {

  public userLogged:User;
  public listaNotas:Note[] = new Array<Note>();
  public activeNote:Note;

  constructor(private authService: AuthService, private noteHttp:NoteHttpService) { }

  ngOnInit() {
      this.userLogged = this.authService.getUserActive();
      console.log(this.userLogged);
      this.authService.emitStatus();
      this.uploadListNote();
      console.log(this.userLogged);
  }

  ngOnChanges(){
    console.log('View Init');
    this.userLogged = this.authService.getUserActive();
    this.authService.emitStatus();
    this.uploadListNote();
    console.log(this.userLogged);
  }

  public changeActiveNote(value:number){
    this.activeNote = this.listaNotas[value];
  }

  public newNote(){
    this.activeNote = null; 
  }

  public uploadListNote(): void {
    this.noteHttp.getAllUserNotes(this.userLogged.id).toPromise()
      .then(
        (res) => {
          this.listaNotas = res;
        }, 
        (error) => {
          console.log(error);
        }
      );
  }

  

}
