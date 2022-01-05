import { Action } from "@ngrx/store";

export enum RoomsActionTypes {
    GetRooms = '[Rooms] GetRooms',
    GetRoomsCompleted = '[Rooms] GetRoomsCompleted',
    CreateRoom = '[Rooms] CreateRoom',
    CreateRoomCompleted = '[Rooms] CreateRoomCompleted',
    SelectRoom = '[Rooms] SelectRoom'
}

export class GetRooms implements Action {
    readonly type = RoomsActionTypes.GetRooms;
}

export class GetRoomsCompleted implements Action {
    readonly type = RoomsActionTypes.GetRoomsCompleted;
    constructor(public payload: { rooms: any }) { }
}

export class CreateRoom implements Action {
    readonly type = RoomsActionTypes.CreateRoom;
    constructor(public payload: { title: any }) { }
}

export class SelectRoom implements Action {
    readonly type = RoomsActionTypes.SelectRoom;
    constructor(public payload: { room: any }) { }
}

export type RoomsActions = 
  | GetRooms
  | GetRoomsCompleted
  | CreateRoom
  | SelectRoom;
