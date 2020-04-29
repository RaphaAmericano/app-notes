import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from './login.state';


const getLoginFeatureState = createFeatureSelector<LoginState>('login');

export const getLoginEmail = createSelector(
    getLoginFeatureState,
    state => state.loginEmail
);

export const getLoginPassword = createSelector(
    getLoginFeatureState,
    state => state.loginPassword
);

export const getSigninName = createSelector(
    getLoginFeatureState,
    state => state.signinName
);

export const getSigninEmail = createSelector(
    getLoginFeatureState,
    state => state.signinEmail
);

export const getSigninPassword = createSelector(
    getLoginFeatureState,
    state => state.signinPassword
);
export const getSigninPasswordRepeat = createSelector(
    getLoginFeatureState,
    state => state.signinPasswordRepeat
)