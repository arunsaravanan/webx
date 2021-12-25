import { RoomsActions, RoomsActionTypes } from "./rooms.actions";

export const roomsFeatureName = 'rooms';

export interface RoomsState {
    rooms: any;
    activeRoom: any;
}

export const initialRoomsState: RoomsState = {
    rooms: null,
    activeRoom: null
}

export function roomsReducer(state = initialRoomsState, action: RoomsActions):RoomsState {
    switch(action.type) {
        case RoomsActionTypes.GetRooms:
            return state;
        case RoomsActionTypes.GetRoomsCompleted:
            return {...state, rooms: action.payload.rooms, activeRoom: action.payload.rooms[0]};
        default:
            return state;
    }
}