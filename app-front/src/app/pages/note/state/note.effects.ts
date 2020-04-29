import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NoteActionTypes } from './note.enum';
import { NotesService } from 'src/app/shared/services/notes.service';
import * as noteActions from './note.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Note } from 'src/app/shared/models/note';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
@Injectable()
export class NoteEffects {
    constructor(private notesService:NotesService, private actions$:Actions){}

    // @Effect()
    // loadNotes$:Observable<Action> = this.actions$.pipe(
    //     ofType(NoteActionTypes.Load),
    //     map((action: NoteActionTypes.Load) => action.payload),
    //     mergeMap((user:User) => {
    //         this.notesService.loadNotes(user.id).pipe(
    //             map(notes => ( new noteActions.LoadSuccess(notes))),
    //             catchError(err => of(new noteActions.LoadFail(err)))
    //         )
    //     })
    // )
}