import { store } from '../..'
import {BlockActionEnum,SetBlock,IState,UpdateHeader, children} from './types'
import {AppDispatch} from '../../index'
import { Istate } from '../../../App'
import { Children } from 'react'
import { stringify } from 'querystring'



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
    },
    AddAction: (state:Istate[],idBlock: string | null, description: string) =>
        (dispatch: AppDispatch) =>
        {
        for(let i = 0; i < state.length; i++){
            if( state[i].id === Number(idBlock) ){
                const lenChildrens = state[i].childrens.length
                const lasElement = state[i].childrens[lenChildrens - 1]
                state[i].childrens[lenChildrens - 1] = {
                    x:lasElement.x,
                    y:999,
                    index:Date.now(),
                    text: description}
                
                state[i].childrens[lenChildrens] = lasElement 
                state[i].length++
                break;
            }    
        }
        BlockActionCreators.UpdateBlockAction(state)
    },
    deleteAction:(state: Istate[], idAction: string | null | undefined, IdBlock: string | null | undefined) =>
        (dispatch: AppDispatch) => {
            for(let iB = 0; iB < state.length; iB++ ){
                if( state[iB].id === Number(IdBlock) ){
                    const childrens = state[iB].childrens
                    for(let iA = 0; iA < childrens.length; iA++ ){
                        if(childrens[iA].index === Number(idAction)){
                            childrens.splice(iA,1)
                            state[iB].length--
                            dispatch(BlockActionCreators.UpdateBlockAction(state))
                            return
                        }
                    }
                }
            }
        }
}