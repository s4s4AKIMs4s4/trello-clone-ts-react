
export interface IclientMouse{
    clientX:string,
    clientY:string
  }
  
  
export interface children{
    x:number,
    y:number,
    text:string,
    index:number,
  }
  
  
export interface IState{
    id:number,
    header:string,
    left:number,
    target: null| number,
    childrens: children[],
    length:number,
}

export enum BlockActionEnum{
    SET_BLOCK_SIZE = "SET_BLOCK_SIZE",
    SET_HEADER = 'SET_HEADER'
}

export interface SetBlock{
    type: BlockActionEnum.SET_BLOCK_SIZE,
    payload:IState[],
}

// export interface UpdateUnit{
//     type:BlockActionEnum.UPDATE_UNIT_SIZE
// }

export interface UpdateHeader{
  type: BlockActionEnum.SET_HEADER,
  payload:{ 
    header: string,
    id: number
  }
}

export type actionType = SetBlock | UpdateHeader


