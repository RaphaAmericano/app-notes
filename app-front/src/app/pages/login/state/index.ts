import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from './login.state';


const getLoginFeatureState = createFeatureSelector<LoginState>('login');

export const getLoginEmail = createSelector(
    getLoginFeatureState,
    state => state.loginEmail
);