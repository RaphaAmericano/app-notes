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
    private formBuilder:FormBuilder) {}

  ngOnInit() {
    this.formTextContent = this.formBuilder.group({
      texto:[null, [Validators.required, Validators.minLength(10)]]   
    });

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
    if( this.activeNote == null || ("undefined" === typeof(this.activeNote['id']))){
      this.saveNewNote();       
    } 
    else {
      this.updateNote();
    }
  }


  private saveNewNote(){
    this.activeNote.id_user = this.user.id;
    this.activeNote.texto = this.formTextContent.get('texto').value.trim();
    this.noteHttp.postNewNote(this.activeNote).subscribe(
      (res) => {
        this.reloadList()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  private updateNote(){
    if(this.activeNote.texto !== this.formTextContent.get('texto').value){
      this.activeNote.texto = this.formTextContent.get('texto').value
      this.noteHttp.updateUserNote(this.activeNote).subscribe(
        (res) => {
          this.reloadList();
        },
        (err) => { console.log(err)}
      )
    } 
    else {
      console.log('texto igual');
    }
  }

  private reloadList(): void {
    this.noteService.loadNotes();
    this.noteService.activeFirstIndexNote();
  }

  public newNote(): void {
    this.formTextContent.reset();
    this.noteService.clearActiveNote();
  }

  public deleteNote(): void {
    this.noteHttp.deleteUserNote(this.activeNote).subscribe(
      () => {
        this.popOverDeleteVisibility = false;
        this.formTextContent.reset();
        this.noteService.loadNotes();
        this.noteService.clearActiveNote();
      },
      (err) => console.log(err)
    )
  }

  public isblankNote(): boolean {
    return ("undefined" === typeof(this.activeNote['id'])) ? false : true 
  }

}
