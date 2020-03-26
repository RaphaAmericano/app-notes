import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { AuthService } from './auth.service';
import { NoteHttpService } from './note-http.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private active_note:BehaviorSubject<Note> = new BehaviorSubject<Note>(new Note());
  private list_notes_behavior:BehaviorSubject<Array<Note>> = new BehaviorSubject<Array<Note>>(null);
  public list_notes:Note[];

  constructor(private auth:AuthService, 
    private noteHttp:NoteHttpService) { }

  public loadNotes(){
    this.auth.getUserActive().subscribe(
      res => this.noteHttp.getAllUserNotes(res.id).subscribe(
        list => { 
          list = this.sortList(list);
          this.list_notes = list;
          this.list_notes_behavior.next(list);
        }
      )
    )
  }

  private sortList(list:Note[]): Array<Note>{
    return list.sort(
      (a, b) => new Date(a.data_edicao).getTime() - new Date(b.data_edicao).getTime()
    )
  }

  public changeActiveNote(id:number): void {
    let note = this.list_notes.filter( note => note.id === id )[0];
    this.active_note.next(note);
  }

  public activeFirstIndexNote(): void {
    this.active_note.next(this.list_notes[0]);
  }

  public clearActiveNote(): void {
    this.active_note.next(new Note());
  }

  public getListNotes():Observable<Array<Note>> {
    return this.list_notes_behavior.asObservable();
  }

  public getActiveNote(): Observable<Note> {
    return this.active_note.asObservable();
  }

}
