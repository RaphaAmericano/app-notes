import { UserState } from './user.state';
import { UserActions } from './user.actions';
import { UserActionTypes } from './user.enum';
import * as fromRoot from './../../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface State extends fromRoot.State {
    user: UserState;
}

const initialState: UserState = {
    user: null,
    error:''
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
    getUserFeatureState,
    state => state.user
);



export function reducer(state = initialState, action:UserActions): UserState {
    switch(action.type){
        case UserActionTypes.Load:
            return {
                ...state,
                user:action.payload
            }
        case UserActionTypes.LoadSuccess:
            return {
                ...state,
                user:action.payload
            }
        case UserActionTypes.LoadFail:
            return {
                ...state,
                user: null,
                error:action.payload
            }
        default:
            return state;
    }
}