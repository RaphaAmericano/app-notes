import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { Note } from '../model/note';
import { NoteHttpService } from '../note-http.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  public userLogged:User;
  public listaNotas:Note[];
  public activeNote:Note;

  constructor(private authService: AuthService, private noteHttp:NoteHttpService) { }

  ngOnInit() {
    this.userLogged = this.authService.getUserActive();
    
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
              console.log(note);
              
            }
          }, 
          (error) => {
            console.log(error);
          });
    console.log(this.listaNotas);
  }



}
