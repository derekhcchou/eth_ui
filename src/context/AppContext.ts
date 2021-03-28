import React, { Reducer } from "react";
import {mergeWith, cloneDeep} from "lodash";
import {initial_AppState, IAppStateType} from "../helpers/types";
import {initializeContextFromSessionStorage} from "./sessionStore"

let sessionStorage = initializeContextFromSessionStorage && initializeContextFromSessionStorage();

// concatting rather than replacing arrays
export const customizer = (objValue: any, srcValue: any) => {
    if (Array.isArray(objValue)) {
        return srcValue;
    }
}

export const initializingAppStateWithSession = {
    ...mergeWith(cloneDeep(initial_AppState), sessionStorage, customizer),
};

export const initValue = {
    initAppState: initializingAppStateWithSession,
} as InitContextProps;

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
}

export type PartialAppState = RecursivePartial<IAppStateType>;


// Might want to store into session and use that for the initial value
export const AppStateContext = React.createContext(initValue);

// Reducer for the App state
export const AppStateReducer: Reducer<IAppStateType, PartialAppState> = (
    initAppState,
    action
) => {
    return {
        ...mergeWith(initAppState, action, customizer),
    } as IAppStateType
}

export type Dispatch = React.Dispatch<PartialAppState>;

export interface InitContextProps {
    initAppState: IAppStateType;
    dispatch: Dispatch;
}