import { createFeatureSelector, createSelector } from '@ngrx/store';
import { spinnerFeatureName, SpinnerState } from './spinner.reducer';

export const getSpinnerFeatureState = createFeatureSelector<SpinnerState>(spinnerFeatureName);

export const spinnerState = createSelector(
  getSpinnerFeatureState,
  (state: SpinnerState) => state.isLoading
);