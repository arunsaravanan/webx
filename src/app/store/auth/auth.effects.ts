import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { AuthActions } from ".";
import { AuthActionTypes } from "./auth.actions";
import * as fromAuthActions from "./auth.actions";
import { AuthService } from "./../../services/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions<AuthActions>,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
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
                            map(() => {
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