import { LoginState } from "./login.state";
import { LoginActionTypes } from './login.enum';
import { LoginActions } from './login.actions';

const initialState:LoginState = {
    loginEmail: null,
    loginPassword: null,
    signinName:null,
    signinEmail:null,
    signinPassword:null,
    signinPasswordRepeat:null 
}

export function reducer(state = initialState, action: LoginActions): LoginState {
    switch(action.type){
        case LoginActionTypes.MaskLoginEmail:
            return {
                ...state,
                loginEmail: action.payload
            }
        case LoginActionTypes.MaskLoginPassword:
            return {
                ...state,
                loginPassword: action.payload
            }
        case LoginActionTypes.MaskSigninName:
            return {
                ...state,
                signinName: action.payload
            }
        case LoginActionTypes.MaskSigninEmail:
            return {
                ...state,
                signinEmail: action.payload
            }
        case LoginActionTypes.MaskSigninPassword:
            return {
                ...state,
                signinPassword: action.payload
            }
        case LoginActionTypes.MaskSigninPasswordRepeat:
            return {
                ...state,
                signinPasswordRepeat: action.payload
            }
        default:
            return state;
    }
}