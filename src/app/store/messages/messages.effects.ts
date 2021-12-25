import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessagesService } from "./../../services/messages.service";
import { MessagesActions, MessagesActionTypes } from ".";
import * as fromMessageActions from './messages.actions';
import { map, switchMap } from "rxjs/operators";
import * as fromSpinnerActions from './../spinner/spinner.actions';

@Injectable()
export class MessagesEffects {
    constructor(private actions$: Actions<MessagesActions>, private messagesService: MessagesService) { }

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
}