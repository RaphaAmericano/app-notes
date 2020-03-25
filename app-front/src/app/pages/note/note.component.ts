import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { Note } from '../../shared/models/note';
import { NoteHttpService } from '../../shared/services/note-http.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  public userLogged:User;
  public listaNotas:Note[] = new Array<Note>();
  public activeNote:Note;

  constructor(
    private authService: AuthService, 
    private noteHttp:NoteHttpService) {}

  ngOnInit() {
      this.authService.getUserActive().subscribe(
        user => this.userLogged = user
      )
      this.updateListNote();
  }

  ngOnChanges(){
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
