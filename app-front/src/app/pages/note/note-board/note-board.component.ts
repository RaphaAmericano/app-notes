import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChanges, AfterViewChecked } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Note } from 'src/app/shared/models/note';
import { NoteHttpService } from 'src/app/shared/services/note-http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { NotesService } from 'src/app/shared/services/notes.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
})
export class NoteBoardComponent implements OnInit {

  public popOverDeleteVisibility:boolean;

  public user: User;
  public activeNote:Note = new Note();
  public formTextContent:FormGroup;

  constructor(
    private authService:AuthService,
    private noteHttp:NoteHttpService, 
    private noteService: NotesService,
    private formBuilder:FormBuilder) { 
      this.formTextContent = this.formBuilder.group({
        texto:[null, [Validators.required, Validators.minLength(10)]]   
      });
    }

  ngOnInit() {
    

    this.authService.getUserActive().subscribe(
      user => this.user = user
    );

    this.noteService.getActiveNote().subscribe(
      note =>  { 
        this.activeNote = note;
        if(note) {
          this.formTextContent.get('texto').setValue(note.texto)
        }
      }
    );
  }

  public addNewNote(): void {
    const newNote = new Note();
    newNote.texto = this.formTextContent.get("texto").value;
    newNote.id_user = parseInt(localStorage.getItem("id")); 
    // this.noteHttp.postNewNote(newNote).subscribe(
    //     (res) => { 
    //       this.updateListEmmiter.emit(); 
    //     },
    //     (error) => { console.log(error)
    //     },
    //     () => {
    //       this.noteCreatedEmmiter.emit();
    //     }
    //   )
  }

  public autoSaveNote(): void {
    setInterval(
      () => {
        if( this.activeNote !== undefined  ){
          if(this.formTextContent.get("texto").value !== this.activeNote.texto){
              this.saveNote();
          }
        }  
    }, 30000)
  }

  public saveNote(): void{
    let note = new Note();
    note.id = this.activeNote.id;
    note.texto = this.formTextContent.get('texto').value;
    // if(note.texto != null ){
    //   this.noteHttp.updateUserNote(note).subscribe(
    //     (res)=> { 
    //       this.updateListEmmiter.emit();
    //     },
    //     (error) =>{
    //       console.log(error);
    //     }
    //   )
    // }
  }

  public deleteNote(): void{
    this.popOverDeleteVisibility = false;
    this.noteHttp.deleteUserNote(this.activeNote).toPromise().then(
      (res) => {
        // this.updateListEmmiter.emit();
        this.formTextContent.reset();
        this.activeNote = null;
      }
    );
  }

}
