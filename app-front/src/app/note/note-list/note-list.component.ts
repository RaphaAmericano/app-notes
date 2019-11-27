import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnChanges {

  @Input() public user:User;
  @Input() public listaNotas:Note[];
  @Output() public noteSelectEmmiter:EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes.listaNotas);
    // console.log(this.listaNotas);
  }

  ngOnInit() {
    
  }
  
  public selectNote(value:number): void{
    this.noteSelectEmmiter.emit(value);
  }

  public addNewNoteField(): void {
    console.log("AddNewNote");
  }

}
