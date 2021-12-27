import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap } from "rxjs/operators";
import { RoomsService } from "./../../services/rooms.service";
import * as fromMessageActions from "./../messages/messages.actions";
import * as fromRoomsActions from './rooms.actions';
import * as fromSpinnerActions from './../spinner/spinner.actions';
import { RoomsActionTypes, RoomsActions } from './rooms.actions';
import * as fromStore from './../index';
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { throwError } from "rxjs";

@Injectable()
export class RoomsEffects {
    constructor(
        private store: Store<fromStore.State>,
        private actions$: Actions<RoomsActions>, 
        private roomsService: RoomsService,
        private toastr: ToastrService
        ) { }

    getRooms$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RoomsActionTypes.GetRooms),
                switchMap(() =>
                    this.roomsService
                        .getRooms()
                ),
                catchError((error) => {
                    this.store.dispatch(new fromSpinnerActions.Spinner({ isLoading: false }));
                    this.toastr.error(error.error.message, 'Get Rooms failed!', {closeButton: true});
                    return throwError(error);
                }),
                switchMap((data: any) => [
                    new fromRoomsActions.GetRoomsCompleted({ rooms: data.items }),
                    new fromMessageActions.GetMessages({ room: data.items[0] })
                ])
            )
    );
}