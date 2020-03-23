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
      this.userLogged.senha = localStorage.getItem("senha");
    }

  ngOnInit() {
      this.authService.emitStatus();
      this.updateListNote();
  }

  ngOnChanges(){
    this.authService.emitStatus();
    this.updateListNote();
  }
 
  public changeActiveNote(value?:number){
    if(value == undefined){
      setTimeout(()=>{
        this.activeNote = this.listaNotas[0];
      }, 50);
    } else {
      const noteSelected = this.listaNotas.filter( note => {
        if(note.id == value){
          return note; 
        }
      });
      console.log(noteSelected);
      this.activeNote = noteSelected[0];
    } 
  }

  public newNote(){
    this.activeNote = null; 
  }

  public updateListNote(): void {
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
