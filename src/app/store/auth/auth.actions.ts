import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AuthCheck = '[Auth] AuthCheck',
  AuthCheckCompleted = '[Auth] AuthCheckCompleted',
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginCompleted = '[Auth] Login Completed',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
  LogoutCompleted = '[Auth] Logout Completed',
}

export class AuthCheck implements Action {
  readonly type = AuthActionTypes.AuthCheck;
}

export class AuthCheckCompleted implements Action {
  readonly type = AuthActionTypes.AuthCheckCompleted;
  constructor(public payload: { isLoggedIn: boolean }) { }
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;
}

export class LoginCompleted implements Action {
  readonly type = AuthActionTypes.LoginCompleted;
  constructor(public payload: { isLoggedIn: boolean }) { }
}

export class LoginFailure implements Action {
    readonly type = AuthActionTypes.LoginFailure;
    constructor(public payload: { error: any }) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutCompleted implements Action {
  readonly type = AuthActionTypes.LogoutCompleted;
}

export type AuthActions = 
  | AuthCheck
  | AuthCheckCompleted
  | Login 
  | LoginSuccess
  | LoginCompleted
  | LoginFailure
  | Logout
  | LogoutCompleted;

