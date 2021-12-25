import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth';
import * as fromAuth from './auth';
import { RoomsEffects } from './rooms';
import * as fromRooms from './rooms';
import { MessagesEffects } from './messages';
import * as fromMessages from './messages';
import * as fromSpinner from './spinner';

export * from './auth';
export * from './rooms';
export * from './messages';
export * from './spinner';

export interface State {
    auth: fromAuth.AuthState,
    rooms: fromRooms.RoomsState,
    messages: fromMessages.MessagesState,
    spinner: fromSpinner.SpinnerState
}

export const appReducer: ActionReducerMap<State, any> = {
    auth: fromAuth.authReducer,
    rooms: fromRooms.roomsReducer,
    messages: fromMessages.messagesReducer,
    spinner: fromSpinner.spinnerReducer
};

export const appEffects = [AuthEffects, RoomsEffects, MessagesEffects];