import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { Note } from 'src/app/model/note';
import { NoteHttpService } from 'src/app/note-http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  }

  ngOnChanges(){
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

    //todo: auto save ao retirar o teclado

    // setTimeout(() => {
    //   this.updateListEmmiter.emit();
    //   this.noteHttp.updateUserNote(this.activeNote).subscribe(
    //     res => console.log(res)
    //   );
    // }, 5000);
    
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
