
export interface IState {
    [index: number]:boolean
}

export enum EventTypesEnum {
    UPDATE = 'UPDATE',
    SET_FALSE = 'SET_FALSE'
}

export interface IUpdateEvent{
    type:EventTypesEnum.UPDATE,
    payload: IState
}

export interface ISetFalse{
    type:EventTypesEnum.SET_FALSE,
    payload:IState
}


export type eventAction = IUpdateEvent | ISetFalse