import { UserActionTypes } from './user.enum';
import { User } from 'src/app/shared/models/user';
import { Action } from '@ngrx/store';

export class Load implements Action {
    readonly type = UserActionTypes.Load;
    constructor(public payload:User){}
}
export class LoadSuccess implements Action {
    readonly type = UserActionTypes.LoadSuccess;
    constructor(public payload:User){}
}
export class LoadFail implements Action {
    readonly type = UserActionTypes.LoadFail;
    constructor(public payload:string){}
}

export type UserActions = Load | LoadSuccess | LoadFail;