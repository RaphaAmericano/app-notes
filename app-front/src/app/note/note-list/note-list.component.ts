import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output  } from '@angular/core';
import { User } from 'src/app/model/user';
import { Note } from 'src/app/model/note';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnChanges  {

  @Input() public user:User;
  @Input() public listaNotas:Note[];
  @Output() public noteSelectEmmiter:EventEmitter<number> = new EventEmitter<number>();
  @Output() public newNoteEmmiter:EventEmitter<void> = new EventEmitter<void>();
  public searchForm:FormGroup;

  constructor(private builder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes.listaNotas);
    // console.log(this.listaNotas);
    //console.log(changes);
  }

  ngOnInit() {
    this.searchForm = this.builder.group({
      query:[null]
    })
  }

  public selectNote(value:number): void{
    this.noteSelectEmmiter.emit(value);
    console.log(value);
    console.log(this.listaNotas);
  }

  public addNewNoteField(): void {
    this.newNoteEmmiter.emit();
  }

}
