import { UserState } from './user.state';

const initialState: UserState = {
    user: null,
    error:''
}

export function reducer(state = initialState, action:UserActions): UserState {
    switch(action.type){
        case '':
            return {
                ...state,
                user:action.payload
            }
        default:
            return state;
    }
}