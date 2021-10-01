import { store } from '../..'
import {IUpdateEvent, EventTypesEnum, IState, ISetFalse} from './types'
import {useTypedSelector} from '../../../hooks/typedSelector'

export const AllEventActionCreators = {
    updateEventAction:(index: number, isAccess: boolean):IUpdateEvent => 
        ({ type:EventTypesEnum.UPDATE, payload: {[index]:isAccess} }),
    SetFalse:(): ISetFalse => {
        const eventState = useTypedSelector(state => state.event)
        const tempState:IState = {} as IState 

        for (let key in eventState) {
            tempState[key] = false
        }
        return {
            type:EventTypesEnum.SET_FALSE,
            payload:tempState
        }
    }
    
}