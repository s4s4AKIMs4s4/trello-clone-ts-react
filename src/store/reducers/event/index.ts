import {EventTypesEnum, IState, eventAction} from './types'

const initialState: IState = {
    0:false,
    1:false,
    2:false,
    3:false,
    4:false,
}

export default function eventReducer(state:IState = initialState, action:eventAction): IState{
    switch(action.type) {
        case EventTypesEnum.UPDATE:
            return {...state, ...action.payload}
        case EventTypesEnum.SET_FALSE: 
            return action.payload        
        default: return state
    }
}




