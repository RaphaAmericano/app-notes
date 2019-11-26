import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from 'src/app/model/user';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
})
export class NoteBoardComponent implements OnInit, OnChanges {

  @Input() public user:User;
  @Input() public activeNote:Note;
  constructor() { }

  ngOnInit() {
    console.log(this.activeNote);
  }

  ngOnChanges(){
    console.log(this.activeNote);
  }
  //ngonchange para carregar a nota selecionada

}
