import { Injectable } from '@angular/core';
import * as userActions from './user.actions';
import { NoteHttpService } from 'src/app/shared/services/note-http.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UserActionTypes } from './user.enum';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

@Injectable()
export class UserEffects {
    constructor(private http:NoteHttpService, private actions$:Actions){}

    // @Effect()
    // loadUser$: Observable<Action> = this.actions$.pipe(
    //     ofType(UserActionTypes.Load),
    //     map((action:userActions.Load) => action.payload),
    //     mergeMap((user:User) => {
    //         this.http.getUserByEmail(user.email).pipe(
    //             map(userLoaded => ( new userActions.LoadSuccess(userLoaded))),
    //             catchError( err => of( new userActions.LoadFail(err)))
    //         )
    //     })
    // )
    
}