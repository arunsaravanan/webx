import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth';
import * as fromAuth from './auth';
import { RoomsEffects } from './rooms';
import * as fromRooms from './rooms';
import { MessagesEffects } from './messages';
import * as fromMessages from './messages';

export * from './auth';
export * from './rooms';
export * from './messages';

export interface State {
    auth: fromAuth.AuthState,
    rooms: fromRooms.RoomsState,
    messages: fromMessages.MessagesState
}

export const appReducer: ActionReducerMap<State, any> = {
    auth: fromAuth.authReducer,
    rooms: fromRooms.roomsReducer,
    messages: fromMessages.messagesReducer
};

export const appEffects = [AuthEffects, RoomsEffects, MessagesEffects];