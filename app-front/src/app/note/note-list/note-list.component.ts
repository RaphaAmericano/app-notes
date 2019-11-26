import { Component, OnInit, Input, OnChanges, AfterContentInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, AfterContentInit {

  @Input() user:User;
  @Input() listaNotas:Note[];

  constructor() { }

  ngOnInit() {
    console.log(this.listaNotas);
  }

  ngAfterContentInit(){
    console.log(this.listaNotas);
  }
 
}
