import {BlockActionEnum,SetBlock,IState,IAddBlock} from './types'
import {AppDispatch} from '../../index'
import { Istate } from '../../../data/board'
import FireBase from '../../../abstractions/http/FirebaseApi'
import {Istate as GoogleState} from '../../../store/reducers/googleAuth/types'

export const BlockActionCreators = {
    UpdateBlockAction: (state: IState[]): SetBlock => {
        return {
            type:BlockActionEnum.SET_BLOCK_SIZE,
            payload:state
        }
    },
    UpdateHeader: (payload:string, id: number,state:Istate[],userId:string | null,auth:GoogleState): SetBlock => {
        
        state.forEach((val) => {
            if( id === val.id ){
              val.header = payload
            } 
        })
        
        if(userId !== ''){
            FireBase.sendData(auth,state,userId).then(() => console.log('ok') )
        }

        return {
            type:BlockActionEnum.SET_BLOCK_SIZE,
            payload:state
        }  
        // return{
        //     type: BlockActionEnum.SET_HEADER,
        //     payload:{
        //         header: payload,
        //         id: id
        //     }
        // }
    },
    UpdateActionHeader:(state: IState[],idBlock: string | null, idAction: string | null, payload: string,userId: string | null, auth:GoogleState) =>
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
        if(userId !== ''){
            FireBase.sendData(auth,state,userId).then(() => console.log('ok') )
          }
    },
   
    AddAction: (state:Istate[],idBlock: string | null, description: string,userId: string | null, auth:GoogleState) =>
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
        if(userId !== ''){
            FireBase.sendData(auth,state,userId).then(() => console.log('ok') )
          }
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
        },
    addBlock:(state:Istate[], nameHeader: string): IAddBlock=>
        {
            state.push({
                id: Date.now(),
                header:nameHeader,
                left: 500,
                target: null,
                childrens:[{x:1,y:10000,text:'add',index:100000}],
                length:1
                }
            )
            return{
                type:BlockActionEnum.ADD_BlOCK,
                payload:state,
            }
    },
    deleteBlcok:(state:Istate[], idBlock: string | null) => 
        (dispatch:AppDispatch) =>{
        for(let i = 0 ; i< state.length ;i++){
            if(state[i].id === Number(idBlock))
                state.splice(i,1)
        }
        dispatch(BlockActionCreators.UpdateBlockAction(state))
        return
        }
    
   

}