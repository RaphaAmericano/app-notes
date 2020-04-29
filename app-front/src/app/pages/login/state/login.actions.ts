import { Action } from '@ngrx/store';
import { LoginActionTypes } from './login.enum';

export class LoginEmail implements Action {
    readonly type = LoginActionTypes.MaskLoginEmail;
    constructor(public payload:string ){}
}
export class LoginPassword implements Action {
    readonly type = LoginActionTypes.MaskLoginPassword;
    constructor(public payload:string){}
}
export class SigninName implements Action {
    readonly type = LoginActionTypes.MaskSigninName;
    constructor(public payload:string){}
} 
export class SigninEmail implements Action {
    readonly type = LoginActionTypes.MaskSigninEmail;
    constructor(public payload:string){}
}
export class SigninPassword implements Action {
    readonly type = LoginActionTypes.MaskSigninPassword;
    constructor(public payload:string){}
}
export class SigninPasswordRepeat implements Action {
    readonly type = LoginActionTypes.MaskSigninPasswordRepeat;
    constructor(public payload:string){}
}
export type LoginActions = LoginEmail | LoginPassword | SigninName | SigninEmail | SigninPassword | SigninPasswordRepeat ;