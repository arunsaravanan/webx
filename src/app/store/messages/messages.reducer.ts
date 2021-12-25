import { MessagesActions, MessagesActionTypes } from "./messages.actions";

export const messagesFeatureName = 'messages';

export interface MessagesState {
    messages: any;
}

export const initialMessagesState: MessagesState = {
    messages: null
}

export function messagesReducer(state = initialMessagesState, action: MessagesActions):MessagesState {
    switch(action.type) {
        case MessagesActionTypes.GetMessages:
            return state;
        case MessagesActionTypes.GetMessagesCompleted:
            return {...state, messages: action.payload.messages.items};
        default:
            return state;
    }
}