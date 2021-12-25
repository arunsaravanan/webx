import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, concatMap, tap, exhaustMap, switchMap } from 'rxjs/operators';
import { AuthActions } from ".";
import { AuthActionTypes } from "./auth.actions";
import * as fromAuthActions from "./auth.actions";
import { AuthService } from "./../../services/auth.service";

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions<AuthActions>,
        private authService: AuthService,
        private router: Router
    ) { }

    login$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.Login),
                tap(() => this.authService.login())
            )
    );

    authCheck$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.AuthCheck),
                switchMap(() =>
                    this.authService
                        .loginCheck()
                        .pipe(
                            map((isLoggedIn) => {
                                return new fromAuthActions.AuthCheckCompleted({ isLoggedIn })
                            })
                        )
                )
            )
    )

    authCheckComplete$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.AuthCheckCompleted),
                switchMap(({ payload }) =>
                    payload.isLoggedIn
                        ? of(new fromAuthActions.LoginCompleted(payload))
                        : of(new fromAuthActions.LogoutCompleted))
            )
    );

    /* loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.LoginSuccess),
                switchMap(() =>
                    this.authService
                        .getAccessToken("authorization_code")
                        .pipe(map(result => {
                            this.authService.setAuthorization(result);
                            return new fromAuthActions.LoginCompleted({ isLoggedIn: true })
                        }),
                            catchError((error) => {
                                this.authService.logout();
                                return of(new fromAuthActions.LoginFailure(error))
                            }))
                )
            )
    ) */

    loginComplete$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.LoginCompleted),
                tap(() => this.authService.navigateToMessages())
            ), { dispatch: false }
    )

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.Logout),
                switchMap(() =>
                    this.authService
                        .logout()
                        .pipe(
                            map((value) => {
                                return new fromAuthActions.LogoutCompleted()
                            })
                        )
                )
            )
    );

    logoutComplete$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.LogoutCompleted),
                tap(() => {
                    this.router.navigate(['/']);
                })
            ),
        { dispatch: false }
    );
}