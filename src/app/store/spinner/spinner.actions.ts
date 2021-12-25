import { Action } from "@ngrx/store";

export enum SpinnerActionTypes {
    Spinner = '[Spinner] Loading'
}

export class Spinner implements Action {
    readonly type = SpinnerActionTypes.Spinner;
    constructor(public payload: { isLoading: any }) { }
}
export type SpinnerActions = Spinner;