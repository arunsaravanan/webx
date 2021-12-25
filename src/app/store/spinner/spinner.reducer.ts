import { SpinnerActions, SpinnerActionTypes } from "./spinner.actions";

export const spinnerFeatureName = 'spinner';

export interface SpinnerState {
    isLoading: any;
}

export const initialSpinnerState: SpinnerState = {
    isLoading: false
}

export function spinnerReducer(state = initialSpinnerState, action: SpinnerActions):SpinnerState {
    switch(action.type) {
        case SpinnerActionTypes.Spinner:
            return {...state, isLoading: action.payload.isLoading };
        default:
            return state;
    }
}