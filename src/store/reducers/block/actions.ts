import { store } from '../..'
import {BlockActionEnum,SetBlock,IState,UpdateHeader} from './types'





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
    }
}