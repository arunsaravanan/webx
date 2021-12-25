import { Action } from "@ngrx/store";
import { AuthActionTypes } from "./auth.actions";

export const authFeatureName = 'auth';

export interface AuthState {
    isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
    isLoggedIn: false
}

export function authReducer(state = initialAuthState, action: Action):AuthState {
    switch(action.type) {
        case AuthActionTypes.AuthCheck:
            return state;
        case AuthActionTypes.AuthCheckCompleted:            
            return {...state, isLoggedIn: true};
        case AuthActionTypes.Login:
            return state;
        case AuthActionTypes.LoginCompleted:
            return {...state, isLoggedIn: true};
        case AuthActionTypes.LoginFailure:
            return state;
        case AuthActionTypes.Logout:
            return state;
        case AuthActionTypes.LogoutCompleted:
            return {...state, isLoggedIn: false};
        default:
            return state;
    }
}