import { Action } from '@ngrx/store';
import { NoteActionTypes } from './note.enum';
import { User } from 'src/app/shared/models/user';
import { Note } from 'src/app/shared/models/note';

export class Load implements Action {
    readonly type = NoteActionTypes.Load;
    constructor(public payload:User){}
}
export class LoadSuccess implements Action {
    readonly type = NoteActionTypes.LoadSuccess;
    constructor(public payload:Note[]){}
}
export class LoadFail implements Action {
    readonly type = NoteActionTypes.LoadFail;
    constructor(public payload:string){}
}

export type NoteActions = Load | LoadSuccess | LoadFail;