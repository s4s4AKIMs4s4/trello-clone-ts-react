import {useState } from 'react'
import {IclientMouse, Istate} from '../data/board'
import { children, IState } from '../store/reducers/block/types'
import {deleteWhitespace} from './UseCleanOut'
import {ImportantText} from '../data/board'
import { useTypedSelector } from './typedSelector'

interface props {
    isMove:boolean,
    clientMouse: IclientMouse
    setClientMouse: (state: IclientMouse) => void,
    isBlockMoved: boolean,
    targetDiv: HTMLDivElement
    UpdateBlockAction:Function
    targetDivElemnt: HTMLDivElement
    actionLeft: number
    basis: number
    ApdateActions: boolean
}

export function useLogKey({
  isMove,
  setClientMouse,
  clientMouse,
  isBlockMoved,
  UpdateBlockAction,
  targetDiv,
  targetDivElemnt,
  actionLeft,
  basis,
  ApdateActions}: props) 
  {
    const [currentInterseptionBlcok, SetCurrentInterseptionBlcok] = useState<number | null>(null)
    const state  = useTypedSelector( state => state.block )

    const deleteTwoWihiteSpace = (state: IState[]) => {
      let isTwoWhite = false
      let newState:IState[] = [...state]

      for(let i = 0 ; i < newState.length;i++){
        if(newState[i].header === ImportantText.whiteSpace && isTwoWhite === false){
          isTwoWhite = true
          continue
        } 
        if(newState[i].header === ImportantText.whiteSpace && isTwoWhite === true){
          newState.splice(i,1)
        }  
      }
      return newState
    }

    const constructNewBlocksWithWhiteSpace = (e:React.MouseEvent) => {
      const newState = [] as Istate[]
      const whiteSpaceObject = {
        header:ImportantText.whiteSpace,
        id:Math.floor(1000*Math.random()),
        left: e.clientX,
        target:null,
        childrens:[{x:1,y:1,text:'', index:20}],
        length:1
      }

      state.forEach((val, index) =>{
        if(state[index].target === 1){
          newState.push(state[index])
          return
        }
        if(val.header === ImportantText.whiteSpace){ 
          if(index === 0){
            if(val.left+ 50>= e.clientX ){
            
            newState.push(state[index])
            return
            }
          }
          return
        }
        if(index === 0){
          if(val.left+ 50>= e.clientX ){
          newState.push(whiteSpaceObject)
          newState.push(state[index])
          return
          }
        }
        if(index+1 === state.length) {newState.push(state[index]); return}
        
        if(e.clientX > val.left   &&  e.clientX < state[index+1].left ){  
          newState.push(state[index])
          newState.push(whiteSpaceObject)
          return 
        }
        newState.push(val)
      })
      return deleteTwoWihiteSpace(newState)
    }

    
    const moveBlock = (e:React.MouseEvent) => {
      let xBasis = 0
      if(state[0].left < 0 ){
        xBasis = -state[0].left
      }

      const Xposition = xBasis + Number(e.clientX) - basis

      targetDiv.style.position = 'absolute'
      targetDiv.style.left = `${Xposition}px`
      targetDiv.style.top =`${e.clientY}px`
    
      const newState = constructNewBlocksWithWhiteSpace(e)
      UpdateBlockAction(newState)
    }

    const pickRightPositionOfActions = (stateSizeble:Array<number>, mousePosition:number, e:React.MouseEvent ): Istate[] => {
      const whiteSpaceObj = {
        index: Date.now(),
        text:ImportantText.whiteSpace,
        x:0,
        y:0,
      }
      let newClildren:children[] = [] 
      let newState:Istate[] = [...state]

      for(let i = 0; i < state.length-1; i++ ){
        if( (stateSizeble[i] <= mousePosition && stateSizeble[i+1] >= mousePosition || (stateSizeble[stateSizeble.length-1] <= e.screenX && i === state.length - 2 )) ){
          if(stateSizeble[stateSizeble.length-1] <= mousePosition && i === stateSizeble.length - 2 ) {           
            i++
          }
          if(state[i].id !== currentInterseptionBlcok)
          {
            UpdateBlockAction(deleteWhitespace(state))
          }

          UpdateBlockAction(deleteWhitespace(state))
          const prevChildren = state[i].childrens
          let isMove = false

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
            if(prevChildren[it].text === ImportantText.whiteSpace){
              isMove = true
              continue
            }   
            if(  (prevChildren[it+1].y >= e.clientY && prevChildren[it].y <= e.clientY)  ){
              isMove = true
              newClildren.push(prevChildren[it])
              newClildren.push(whiteSpaceObj)             
              continue;
            }
              newClildren.push(prevChildren[it])
          }
          SetCurrentInterseptionBlcok(state[i].id)
          newState[i].childrens = newClildren  
        } 

      }
      return newState
    }
    const createNewActionsWithWhiteSpace = (e:React.MouseEvent):Istate[] => {
      let xBasis = 0
      if(state[0].left < 0 ){
        xBasis = -state[0].left
      }
      let difSpace = Math.abs(state[1].left - state[0].left)
      let stateSizeble:Array<number> = []
      let sum = 0
      for(let i = 0; i < state.length; i++){
        stateSizeble[i] = sum
        sum += difSpace
      }
      if(xBasis === 0){
        difSpace = 0
      }   
      const mousePosition = xBasis + e.clientX
      return pickRightPositionOfActions(stateSizeble, mousePosition, e)
    
    }
    
    const moveAction = (e:React.MouseEvent) => {
      targetDivElemnt.style.position = 'absolute'
      const calc  = Number(clientMouse.clientX) - actionLeft
      targetDivElemnt.style.left = `${calc}px`
      targetDivElemnt.style.top =`${clientMouse.clientY}px`
      UpdateBlockAction(createNewActionsWithWhiteSpace(e))
    }
    
  return (e:React.MouseEvent) => {
      const obj = {
        clientX:e.clientX.toString(),
        clientY:e.clientY.toString()
      }
      setClientMouse(obj)
      if(isMove)
        {
          if(isBlockMoved){
            moveBlock(e)
          }
          if(ApdateActions){
            setTimeout(() => {
              moveAction(e)
            });
          }
        }
    }
}