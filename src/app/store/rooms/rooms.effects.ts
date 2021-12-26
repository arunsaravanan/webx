import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";
import { RoomsService } from "./../../services/rooms.service";
import * as fromMessageActions from "./../messages/messages.actions";
import * as fromRoomsActions from './rooms.actions';
import { RoomsActionTypes, RoomsActions } from './rooms.actions';

@Injectable()
export class RoomsEffects {
    constructor(private actions$: Actions<RoomsActions>, private roomsService: RoomsService) { }

    getRooms$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RoomsActionTypes.GetRooms),
                switchMap(() =>
                    this.roomsService
                        .getRooms()
                ),
                switchMap((data: any) => [
                    new fromRoomsActions.GetRoomsCompleted({ rooms: data.items }),
                    new fromMessageActions.GetMessages({ room: data.items[0] })
                ])
            )
    );
}