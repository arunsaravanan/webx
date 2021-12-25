import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
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

    /*  getRoomsCompleted$ = createEffect(
         () =>
             this.actions$.pipe(
                 ofType(RoomsActionTypes.GetRoomsCompleted),
                 tap(() => {
                     return new fromMessageActions.GetMessages()
                 })
             ),
             {dispatch: false}
     ); */
}