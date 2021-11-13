import { Console } from 'console'
import {useState } from 'react'
import {IclientMouse, Istate} from '../data/board'
import { children, IState } from '../store/reducers/block/types'
import {deleteWhitespace} from './UseCleanOut'

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
    setFlagUpdateAction:Function
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
  idBlock,
  setFlagUpdateAction}: props) 
  {
    const [currentInterseptionBlcok, SetCurrentInterseptionBlcok] = useState<number | null>(null)


    const deleteTwoWihiteSpace = (newState: IState[]) => {
      let isTwoWhite = false
      console.log('New State')
      newState.forEach((val) =>{
        console.log(val)
      })
      
      for(let i = 0 ; i < newState.length;i++){
        if(newState[i].header === 'white space' && isTwoWhite === false){
          isTwoWhite = true
          continue
        } 
        console.log(isTwoWhite)   
        if(newState[i].header === 'white space' && isTwoWhite === true){
          console.log('delete')
          newState.splice(i,1)
        }  
      }
      return newState
    }

    const constructNewSateWithWhiteSpace = (e:React.MouseEvent) => {
      const newState = [] as Istate[]
      
      state.forEach((val, index) =>{
        if(state[index].target === 1){
          newState.push(state[index])
          return
        }
        if(val.header === 'white space'){ 
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
          newState.push({
            header:'white space',
            id:Math.floor(1000*Math.random()),
            left: e.clientX,
            target:null,
            childrens:[{x:1,y:1,text:'', index:20}],
            length:1
          })
          newState.push(state[index])
          return
          }
        }
        if(index+1 === state.length) {newState.push(state[index]); return}
        
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
      return deleteTwoWihiteSpace(newState)
    }

    
    const moveBlock = (e:React.MouseEvent) => {
      let xBasis = 0
      if(state[0].left < 0 ){
        xBasis = -state[0].left
      }
      const Xposition = xBasis + Number(e.clientX) - basis
      console.log('Xposition');
      console.log(Xposition);
      
      targetDiv.style.position = 'absolute'
      targetDiv.style.left = `${Xposition}px`
      targetDiv.style.top =`${e.clientY}px`
    
      const newState = constructNewSateWithWhiteSpace(e)
      UpdateBlockAction(newState)
    }

    const newActionWithWhiteSpace = (e:React.MouseEvent, left: number) => {
      const whiteSpaceObj = {
        index: Date.now(),
        text:'white space',
        x:0,
        y:0,
      }
    
      let newClildren:children[] = [] 
      let xBasis = 0
      if(state[0].left < 0 ){
        xBasis = -state[0].left
      }
    
  
    let difSpace = Math.abs(state[1].left - state[0].left)
      let stateSizeble:Array<number> = []
      let sum = 0
      for(let i = 0;i< state.length;i++){
        stateSizeble[i] = sum
        sum += difSpace
        // console.log('stateSizeble ',i)
        // console.log(stateSizeble[i])
      }
      if(xBasis === 0){
        difSpace = 0
      }
      
      const cl = xBasis + e.clientX
      // console.log('clientX')
      // console.log(cl)
      for(let i = 0; i < state.length-1; i++ ){
        if( (stateSizeble[i]   < cl && stateSizeble[i+1] > cl || (stateSizeble[stateSizeble.length-1] <= e.screenX && i === state.length - 2 )) ){

          if(stateSizeble[stateSizeble.length-1] <= cl && i === stateSizeble.length - 2 ) {           
            i++
          }
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
    
    const moveAction = (e:React.MouseEvent) => {
      targetDivElemnt.style.position = 'absolute'
      const calc  = Number(clientMouse.clientX) - left
      targetDivElemnt.style.left = `${calc}px`
      targetDivElemnt.style.top =`${clientMouse.clientY}px`
      UpdateBlockAction(newActionWithWhiteSpace(e,left), )
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
            moveBlock(e)
          }
          else{

            setTimeout(() => {
              moveAction(e)
            }, 5);
          }
        }

      

    }
}