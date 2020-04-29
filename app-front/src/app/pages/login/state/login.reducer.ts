import { LoginState } from "./login.state";
import { LoginActionTypes } from './login.enum';
import { LoginActions } from './login.actions';



const initialState:LoginState = {
    loginEmail: null,
    loginPassword: null,
    signinEmail:null,
    signinName:null,
    signinPassword:null,
    signinPasswordConfirm:null 
}

export function reducer(state = initialState, action: LoginActions): LoginState {
    switch(action.type){
        case LoginActionTypes.MaskLoginEmail:
            return {
                ...state,
                loginEmail: action.payload
            }
        default:
            return state;
    }
}