import { Children, useState } from 'react'
import {IclientMouse, Istate} from '../App'
import { children } from '../store/reducers/block/types'
import {deleteWhitespace} from './cleanOut'

interface props {
    flag:boolean,
    clientMouse: IclientMouse
    setClientMouse: (state: IclientMouse) => void,
    isBlockMoved: boolean,
    targetDiv: HTMLDivElement
    state: Istate[]
    UpdateBlockAction:Function
    targetDivElemnt: HTMLDivElement
    left: number
    basis: number
    idBlock: string | null
}




const constructNewSateWithWhiteSpace = (e:React.MouseEvent, state: Istate[]) => {
  const newState = [] as Istate[]
  state.forEach((val) => {
    console.log(val.header)
  })
  state.forEach((val, index) =>{
    if(state[index].target === 1){
      newState.push(state[index])
      return
    }
    if(index+1 === state.length) {newState.push(state[index]); return}
    if(val.header === 'white space') return
    if(e.clientX > val.left   &&  e.clientX < state[index+1].left ){  
      newState.push(state[index])
      newState.push({
        header:'white space',
        id:Math.floor(1000*Math.random()),
        left: e.clientX,
        target:null,
        childrens:[{x:1,y:1,text:'', index:20}],
        length:1
      })
    
      return 
    }
    newState.push(val)

  })
  return newState
}



const moveBlock = (clientMouse: IclientMouse, basis: number, state :Istate[], e:React.MouseEvent, targetDiv:HTMLDivElement,UpdateBlockAction: Function ) => {
  const Xposition = Number(clientMouse.clientX) - basis
  targetDiv.style.position = 'absolute'
  targetDiv.style.left = `${Xposition}px`
  targetDiv.style.top =`${clientMouse.clientY}px`

  const newState = constructNewSateWithWhiteSpace(e, state)
  UpdateBlockAction(newState)
}





export function useLogKey({
  flag,
  setClientMouse,
  clientMouse,
  isBlockMoved,
  UpdateBlockAction,
  state,
  targetDiv,
  targetDivElemnt,
  left,
  basis,
  idBlock}: props) 
  {
    const [currentInterseptionBlcok, SetCurrentInterseptionBlcok] = useState<number | null>(null)

    const newActionWithWhiteSpace = (state:Istate [],idBlock: string | null, e:React.MouseEvent) => {
      const whiteSpaceObj = {
        index: Date.now(),
        text:'white space',
        x:0,
        y:0,
      }
    
      let newClildren:children[] = [] 
      for(let i = 0; i < state.length-1; i++ ){
        if( (state[i].left < e.clientX && state[i+1].left > e.clientX )){
         
          if(state[i].id !== currentInterseptionBlcok)
          {
            deleteWhitespace(state)
            UpdateBlockAction(state)
          }
            deleteWhitespace(state)
            const prevChildren = state[i].childrens
            let flag = false

            for (let it = 0; it < prevChildren.length; it++){
                if(it === 0 && prevChildren[it].y + 7  >= e.clientY ){
                  newClildren.push(whiteSpaceObj)
                  newClildren.push(prevChildren[it])
                  continue;
                }
                if(it === prevChildren.length - 1 ){
                    newClildren.push(prevChildren[it])
                    continue
                }
              if(prevChildren[it].text === 'white space'){
                flag = true
                continue
              }   
              if(  (prevChildren[it+1].y >= e.clientY && prevChildren[it].y <= e.clientY)  ){
                flag = true

                
                newClildren.push(prevChildren[it])
                newClildren.push(whiteSpaceObj)
                

                continue;
              }
                newClildren.push(prevChildren[it])
            }
            SetCurrentInterseptionBlcok(state[i].id)
            state[i].childrens = newClildren  

          } 
        }
      return state
    }
    
    const moveAction = (clientMouse: IclientMouse, left: number, targetDivElemnt:HTMLDivElement,idBlock: string | null,  e:React.MouseEvent, state: Istate[], UpdateBlockAction: Function) => {
      targetDivElemnt.style.position = 'absolute'
      const calc  = Number(clientMouse.clientX) - left
      targetDivElemnt.style.left = `${calc}px`
      targetDivElemnt.style.top =`${clientMouse.clientY}px`
      UpdateBlockAction(newActionWithWhiteSpace(state,idBlock,e,))
    
    }
    
  return (e:React.MouseEvent) => {
      const obj = {
        clientX:e.clientX.toString(),
        clientY:e.clientY.toString()
      }
      setClientMouse(obj)
      if(flag)
        {
          if(isBlockMoved){
            moveBlock(clientMouse, basis, state, e, targetDiv,UpdateBlockAction )
          }
          else{
            moveAction(clientMouse, left, targetDivElemnt,idBlock, e, state,UpdateBlockAction)
          }
        }

      

    }
}