import { Action } from "@ngrx/store";

export enum MessagesActionTypes {
    GetMessages = '[Messages] GetMessages',
    GetMessagesCompleted = '[Messages] GetMessagesCompleted',
    CreateMessage = '[Messages] CreateMessage',
    CreateMessageCompleted = '[Messages] CreateMessageCompleted'
}

export class GetMessages implements Action {
    readonly type = MessagesActionTypes.GetMessages;
    constructor(public payload: { room: any }) { }
}

export class GetMessagesCompleted implements Action {
    readonly type = MessagesActionTypes.GetMessagesCompleted;
    constructor(public payload: { messages: any }) { }
}


export class CreateMessage implements Action {
    readonly type = MessagesActionTypes.CreateMessage;
}

export class CreateMessageCompleted implements Action {
    readonly type = MessagesActionTypes.CreateMessageCompleted;
}

export type MessagesActions = 
  | GetMessages
  | GetMessagesCompleted
  | CreateMessage 
  | CreateMessageCompleted;