import { Action } from '@ngrx/store';
import { LoginActionTypes } from './login.enum';

export class LoginEmail implements Action {
    readonly type = LoginActionTypes.MaskLoginEmail;
    constructor(public payload:string ){}
}
export type LoginActions = LoginEmail;