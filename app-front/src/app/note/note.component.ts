import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { Note } from '../model/note';
import { NoteHttpService } from '../note-http.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  public userLogged:User = new User();
  public listaNotas:Note[] = new Array<Note>();
  public activeNote:Note;

  constructor(
    private authService: AuthService, 
    private noteHttp:NoteHttpService) { 
      this.userLogged.id = +localStorage.getItem("id");
      this.userLogged.nome = localStorage.getItem("nome");
      this.userLogged.email = localStorage.getItem("email");
      console.log(this.userLogged);
    }

  ngOnInit() {
      this.authService.emitStatus();
      this.uploadListNote();
  }

  ngOnChanges(){
    this.authService.emitStatus();
    this.uploadListNote();
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
