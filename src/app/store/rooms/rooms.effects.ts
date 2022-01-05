import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, first, map, switchMap, take, tap } from "rxjs/operators";
import { RoomsService } from "./../../services/rooms.service";
import * as fromMessageActions from "./../messages/messages.actions";
import * as fromRoomsActions from './rooms.actions';
import * as fromSpinnerActions from './../spinner/spinner.actions';
import { RoomsActionTypes, RoomsActions } from './rooms.actions';
import * as fromStore from './../index';
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { throwError } from "rxjs";
import { selectedActiveRoom } from ".";

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
                    this.toastr.error(error.error.message, 'Get Rooms failed!', { closeButton: true });
                    return throwError(error);
                }),
                switchMap((data: any) => [
                    new fromRoomsActions.GetRoomsCompleted({ rooms: data.items }),
                    new fromMessageActions.GetMessages()
                ])
            )
    );
    createRoom$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RoomsActionTypes.CreateRoom),
                switchMap((data) =>
                    this.roomsService
                        .createRoom(data.payload.title)
                        .pipe(
                            map(() => {
                                this.toastr.success('Room created successfully!', 'Webex Messages', { closeButton: true });
                                return new fromRoomsActions.GetRooms()
                            }),
                            catchError((error) => {
                                this.store.dispatch(new fromSpinnerActions.Spinner({ isLoading: false }));
                                this.toastr.error(error.error.message, 'Create Room failed!', { closeButton: true });
                                return throwError(error);
                            })
                        )
                )
            )
    )

    selectRoom$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RoomsActionTypes.SelectRoom),
                map((data) => {
                    //console.log(data.payload.room);
                    return new fromMessageActions.GetMessages()
                })
            )
    )
}