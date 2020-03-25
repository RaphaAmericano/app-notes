import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { AuthService } from './auth.service';
import { NoteHttpService } from './note-http.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private active_note:BehaviorSubject<Note> = new BehaviorSubject<Note>(null);
  private list_notes_behavior:BehaviorSubject<Array<Note>> = new BehaviorSubject<Array<Note>>(null);
  public list_notes:Note[];

  constructor(private auth:AuthService, 
    private noteHttp:NoteHttpService) { }

  public loadNotes(){
    this.auth.getUserActive().subscribe(
      res => this.noteHttp.getAllUserNotes(res.id).subscribe(
        list => { 
          this.list_notes = list;
          this.list_notes_behavior.next(list);
        }
      )
    )
  }

  public changeActiveNote(index:number): void {
    this.active_note.next(this.list_notes[index]);
  }

  public getListNotes():Observable<Array<Note>> {
    return this.list_notes_behavior.asObservable();
  }

  public getActiveNote(): Observable<Note> {
    return this.active_note.asObservable();
  }

}
