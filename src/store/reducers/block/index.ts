import { bindActionCreators } from "redux";
import {IState, actionType, BlockActionEnum} from './types'


const initialState: IState[] = [
    {
      id:1,
      header:'hello',
      left:1,
      target:null,
      childrens:[{x:1,y:1,text:'1',index:1},{x:1,y:2,text:'12',index:2},{x:1,y:1000,text:'add',index:100000}],
      length:3,
    },
    {
      id:2,
      header:'word',
      left:2,
      target:null,
      childrens:[{x:1,y:1,text:'2',index:3},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },
    {
      id:3,
      header:'bbbbb',
      left:3,
      target:null,
      childrens:[{x:1,y:1,text:'3',index:4},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },
    {
      id:4,
      header:'ffffffffff',
      left:4,
      target:null,
      childrens:[{x:1,y:1,text:'4',index:5},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },
    {
      id:5,
      header:'sssssssssssssssssssssss',
      left:4,
      target:null,
      childrens:[{x:1,y:1,text:'5',index:6},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },
  ]


  
export default function blockModelReducer(state: IState[] = initialState, action:actionType){
    switch(action.type) {
        case BlockActionEnum.SET_BLOCK_SIZE:
          return action.payload
        case BlockActionEnum.SET_HEADER:{
          state.forEach((val) => {
            if( action.payload.id === val.id ){
              val.header = action.payload.header
            } 
          })
          return state
        }
        default: return state
    }
}






