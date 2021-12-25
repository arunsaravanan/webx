import { createFeatureSelector, createSelector } from '@ngrx/store';
import { messagesFeatureName, MessagesState } from './messages.reducer';

export const getMessagesFeatureState = createFeatureSelector<MessagesState>(messagesFeatureName);

export const selectedMessages = createSelector(
  getMessagesFeatureState,
  (state: MessagesState) => state.messages
);