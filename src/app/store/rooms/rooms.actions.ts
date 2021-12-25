import { Action } from "@ngrx/store";

export enum RoomsActionTypes {
    GetRooms = '[Rooms] GetRooms',
    GetRoomsCompleted = '[Rooms] GetRoomsCompleted',
    CreateRoom = '[Rooms] CreateRoom',
    CreateRoomCompleted = '[Rooms] CreateRoomCompleted'
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
}

export class CreateRoomCompleted implements Action {
    readonly type = RoomsActionTypes.CreateRoomCompleted;
}

export type RoomsActions = 
  | GetRooms
  | GetRoomsCompleted
  | CreateRoom 
  | CreateRoomCompleted;
