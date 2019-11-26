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

  public userLogged:User;
  public listaNotas:Note[] = new Array<Note>();
  public activeNote:Note;

  constructor(private authService: AuthService, private noteHttp:NoteHttpService) { }

  ngOnInit() {
    this.userLogged = this.authService.getUserActive();
    this.authService.emitStatus();
    this.noteHttp.getAllUserNotes(this.userLogged.id)
      .toPromise()
        .then(
          (res) => {
            for(let index in res ){
              let note = new Note();
              note.id = res[index].id;
              note.id_user = res[index].id_user;
              note.texto = res[index].texto;
              note.data_criacao = new Date( res[index].data_criacao);
              note.data_edicao = new Date(res[index].data_edicao);
              this.listaNotas.push(note);
            }
          }, 
          (error) => {
            console.log(error);
          });
    //
  }

  public changeActiveNote(value:number){
    this.activeNote = this.listaNotas[value];
  }


  //todo: ng onchange para injetar no campo da lsita

}
