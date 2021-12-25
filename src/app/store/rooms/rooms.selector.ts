import { createFeatureSelector, createSelector } from '@ngrx/store';
import { roomsFeatureName, RoomsState } from './rooms.reducer';

export const getRoomsFeatureState = createFeatureSelector<RoomsState>(roomsFeatureName);

export const selectedRooms = createSelector(
  getRoomsFeatureState,
  (state: RoomsState) => state.rooms
);

export const selectedActiveRoom = createSelector(
    getRoomsFeatureState,
    (state: RoomsState) => state.activeRoom
  );