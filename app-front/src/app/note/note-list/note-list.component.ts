import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from 'src/app/model/user';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnChanges {

  @Input() user:User;
  @Input() listaNotas:Note[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes.listaNotas);
    // console.log(this.listaNotas);
  }

  ngOnInit() {
    console.log(this.listaNotas);
  }
 

  public addNewNoteField(): void {
    console.log("AddNewNote");
  }

}
