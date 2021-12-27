import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessagesService } from "./../../services/messages.service";
import { MessagesActions, MessagesActionTypes } from ".";
import * as fromMessageActions from './messages.actions';
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromSpinnerActions from './../spinner/spinner.actions';
import * as fromStore from './../index';
import { Store } from "@ngrx/store";
import { selectedActiveRoom } from "../rooms";
import { ToastrService } from "ngx-toastr";
import { Observable, of, throwError } from "rxjs";

@Injectable()
export class MessagesEffects {
    constructor(
        private store: Store<fromStore.State>,
        private actions$: Actions<MessagesActions>,
        private messagesService: MessagesService,
        private toastr: ToastrService
    ) { }

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
                            ]),
                            catchError((error) => {
                                this.store.dispatch(new fromSpinnerActions.Spinner({ isLoading: false }));
                                this.toastr.error(error.error.message, 'Get messages failed!', {closeButton: true});
                                return throwError(error);
                            })
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
                                            this.toastr.success('Message sent successfully!', 'Webex Messages', { closeButton: true });
                                            return new fromMessageActions.GetMessages({ room: value })
                                        })
                                    )),
                                    catchError((error) => {
                                        this.store.dispatch(new fromSpinnerActions.Spinner({ isLoading: false }));
                                        this.toastr.error(error.error.message, 'Create Webex Message failed!', {closeButton: true});
                                        return throwError(error);
                                    })
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
                                            this.toastr.success('Message deleted successfully!', 'Webex Messages', { closeButton: true });
                                            return new fromMessageActions.GetMessages({ room: value })
                                        })
                                    )),
                                    catchError((error) => {
                                        this.store.dispatch(new fromSpinnerActions.Spinner({ isLoading: false }));
                                        this.toastr.error(error.error.message, 'Delete Webex Message failed!', {closeButton: true});
                                        return throwError(error);
                                    })
                        )
                )
            )
    )
}