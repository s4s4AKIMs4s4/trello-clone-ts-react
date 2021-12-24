import {Istate,actionType,AuthActionEnum} from './types'
const initialState: Istate = {
    userEmail: ''
}

export default function eventReducer(state:Istate = initialState, action:actionType): Istate{

    switch(action.type) {
        case AuthActionEnum.SET_EMAIL:
            return {...state,  userEmail:action.payload}
        default: return state
    }
}



