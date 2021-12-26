import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessagesService } from "./../../services/messages.service";
import { MessagesActions, MessagesActionTypes } from ".";
import * as fromMessageActions from './messages.actions';
import { first, map, mapTo, switchMap, tap } from "rxjs/operators";
import * as fromSpinnerActions from './../spinner/spinner.actions';
import * as fromStore from './../index';
import { select, State, Store } from "@ngrx/store";
import { selectedActiveRoom } from "../rooms";

@Injectable()
export class MessagesEffects {
    constructor(private store: Store<fromStore.State>, private actions$: Actions<MessagesActions>, private messagesService: MessagesService) { }

    getMessages$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(MessagesActionTypes.GetMessages),
                switchMap((data) =>
                    this.messagesService
                        .getMessages(data.payload.room)
                        .pipe(
                            switchMap((messages) => [
                                new fromSpinnerActions.Spinner({ isLoading: false }),
                                new fromMessageActions.GetMessagesCompleted({ messages })
                            ])
                        )
                )
            )
    );

    createMessage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(MessagesActionTypes.CreateMessage),
                switchMap((data) =>
                    this.messagesService
                        .createMessage(data.payload.message)
                        .pipe(
                            switchMap(() =>
                                this.store
                                    .select(selectedActiveRoom)
                                    .pipe(
                                        map((value) => {
                                            return new fromMessageActions.GetMessages({ room: value })
                                        })
                                    ))
                        )
                )
            )
    )

    deleteMessage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(MessagesActionTypes.DeleteMessage),
                switchMap((data) =>
                    this.messagesService
                        .deleteMessage(data.payload.message)
                        .pipe(
                            switchMap(() =>
                                this.store
                                    .select(selectedActiveRoom)
                                    .pipe(
                                        map((value) => {
                                            return new fromMessageActions.GetMessages({ room: value })
                                        })
                                    ))
                        )
                )
            )
    )
}