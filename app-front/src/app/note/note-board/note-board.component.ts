import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from 'src/app/model/user';
import { Note } from 'src/app/model/note';
import { NoteHttpService } from 'src/app/note-http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
})
export class NoteBoardComponent implements OnInit, OnChanges {

  @Input() public user:User;
  @Input() public activeNote:Note;

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
    if(this.activeNote !== undefined ){
      
      this.formTextContent.setValue({ texto: this.activeNote.texto });
    }
  }
  //ngonchange para carregar a nota selecionada

  public saveNote(): void{
    console.log(this.formTextContent.get("texto").value);
  }

}
