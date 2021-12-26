import { Action } from "@ngrx/store";

export enum MessagesActionTypes {
    GetMessages = '[Messages] GetMessages',
    GetMessagesCompleted = '[Messages] GetMessagesCompleted',
    CreateMessage = '[Messages] CreateMessage',
    DeleteMessage = '[Messages] DeleteMessage'
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
    constructor(public payload: { message: any }) { }
}

export class DeleteMessage implements Action {
    readonly type = MessagesActionTypes.DeleteMessage;
    constructor(public payload: { message: any }) { }
}

export type MessagesActions = 
  | GetMessages
  | GetMessagesCompleted
  | CreateMessage 
  | DeleteMessage;