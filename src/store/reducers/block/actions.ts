import {BlockActionEnum,SetBlock,IState} from './types'





export const BlockActionCreators = {
    UpdateBlockAction: (state: IState[]): SetBlock => {
        return {
            type:BlockActionEnum.SET_BLOCK_SIZE,
            payload:state
        }
    }
}