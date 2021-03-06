import {IState, actionType, BlockActionEnum} from './types'


export const initialState: IState[] = [
    {
      id:1,
      header:'One block',
      left:1,
      target:null,
      childrens:[{x:1,y:1,text:'1',index:34},{x:1,y:2,text:'12',index:23},{x:1,y:1000,text:'add',index:100000}],
      length:3,
    },
    {
      id:2,
      header:'Two block',
      left:2,
      target:null,
      childrens:[{x:1,y:1,text:'2',index:333},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },
    {
      id:3,
      header:'Three block',
      left:3,
      target:null,
      childrens:[{x:1,y:1,text:'3',index:433},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },
    {
      id:4,
      header:'four block',
      left:4,
      target:null,
      childrens:[{x:1,y:1,text:'4',index:34},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },

  ]


  
export default function blockModelReducer(state: IState[] = initialState, action:actionType){
    switch(action.type) {
        case BlockActionEnum.SET_BLOCK_SIZE:
          return [...action.payload]
        case BlockActionEnum.ADD_BlOCK:
          return [...action.payload]  
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






