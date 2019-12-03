import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/app/model/user';
import { Note } from 'src/app/model/note';
import { NoteHttpService } from 'src/app/note-http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
})
export class NoteBoardComponent implements OnInit, OnChanges {

  public popOverDeleteVisibility:boolean;

  @Input() public user:User;
  @Input() public activeNote:Note;
  @Output() public updateListEmmiter:EventEmitter<void> = new EventEmitter<void>();
  @Output() public noteCreatedEmmiter:EventEmitter<void> = new EventEmitter<void>();
  public formTextContent:FormGroup;

  constructor(
    private noteHttp:NoteHttpService, 
    private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.formTextContent = this.formBuilder.group({
      texto:[null, [Validators.required, Validators.minLength(10)]]   
    });
    console.log(this.activeNote);
    this.saveNote();
  }


  ngOnChanges(changes:SimpleChanges){
    // console.log(changes);

    if(this.formTextContent){
      if(this.activeNote !== undefined && this.activeNote !== null ){
        this.formTextContent.setValue({ texto: this.activeNote.texto });
      } else if(this.activeNote == null){
        this.formTextContent.reset();
      }
    }
    if(this.activeNote == null && this.formTextContent){
      this.formTextContent.reset();
    }
  }

  public addNewNote(): void {
    const newNote = new Note();
    newNote.texto = this.formTextContent.get("texto").value;
    newNote.id_user = parseInt(localStorage.getItem("id")); 
    this.noteHttp.postNewNote(newNote).toPromise()
      .then(
        (res) => { 
          this.updateListEmmiter.emit(); 
        },
        (error) => { console.log(error),
        setTimeout(() => { this.noteCreatedEmmiter.emit() }, 500 )  
      }
      );
  }

  public saveNote(): void {
    
    setInterval(
      () => {
        if( this.activeNote !== undefined  ){
          console.log(this.formTextContent.get("texto").value == this.activeNote.texto); 
          if(this.formTextContent.get("texto").value !== this.activeNote.texto){
            let note = new Note();
              note.id = this.activeNote.id;
              note.texto = this.formTextContent.get('texto').value;
              this.noteHttp.updateUserNote(note).subscribe(
                (res)=> { 
                  this.updateListEmmiter.emit();
                },
                (error) =>{
                  console.log(error);
                }
              ) 
          }
        }
    }, 10000)
  }

  public deleteNote(): void{
    this.popOverDeleteVisibility = false;
    this.noteHttp.deleteUserNote(this.activeNote).toPromise().then(
      (res) => {
        console.log(res)
        this.updateListEmmiter.emit();
        this.formTextContent.reset();
        this.activeNote = null;
      }
    );
  }

}
