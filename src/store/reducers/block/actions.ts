import { store } from '../..'
import {BlockActionEnum,SetBlock,IState,UpdateHeader} from './types'
import {AppDispatch} from '../../index'



export const BlockActionCreators = {
    UpdateBlockAction: (state: IState[]): SetBlock => {
        return {
            type:BlockActionEnum.SET_BLOCK_SIZE,
            payload:state
        }
    },
    UpdateHeader: (payload:string, id: number): UpdateHeader => {
        return{
            type: BlockActionEnum.SET_HEADER,
            payload:{
                header: payload,
                id: id
            }
        }
    },
    UpdateActionHeader:(state: IState[],idBlock: string | null, idAction: string | null, payload: string) =>
    (dispatch:AppDispatch) =>
    {
        for(let iB = 0; iB < state.length; iB++ ){
            if( state[iB].id === Number(idBlock) ){
                const childrens = state[iB].childrens
                for(let iA = 0; iA < childrens.length; iA++ ){
                    if(childrens[iA].index === Number(idAction)){
                        childrens[iA].text = payload
                        BlockActionCreators.UpdateBlockAction(state)
                    }
                }
            }
            
        }
    }
}