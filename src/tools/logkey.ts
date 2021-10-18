import { Children } from 'react'
import {IclientMouse, Istate} from '../App'
import { children } from '../store/reducers/block/types'


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
    console.log('e.clientX ',e.clientX)
    console.log('val ',val)
    console.log('state[index+1] ',state[index+1])
    if(state[index].target === 1){
      newState.push(state[index])
      return
    }
    if(index+1 === state.length) {newState.push(state[index]); return}
    if(val.header === 'white space') return
    if(e.clientX > val.left   &&  e.clientX < state[index+1].left ){  
      console.log('set newState')
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
  console.log('newState', newState)
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


const newActionWithWhiteSpace = (state:Istate [],idBlock: string | null, e:React.MouseEvent) => {
  const whiteSpaceObj = {
    index: Date.now(),
    text:'white space',
    x:0,
    y:0,
  }
  let newClildren:children[] = [] 
  console.log(e.clientY)
  for(let i = 0; i < state.length-1; i++ ){
    // if(state[i].id === Number(idBlock)){
    //   state[i].length 
    // }
    if( state[i].left < e.clientX && state[i+1].left > e.clientX ){
      const prevChildren = state[i].childrens
      // console.log('prevChildren')
      // console.log(prevChildren)
      let flag = false
      for (let it = 0; it < prevChildren.length; it++){

        // if(it === prevChildren.length - 1){
        //   newClildren.push(whiteSpaceObj)
        // }
          if(it === prevChildren.length - 1 ){
            newClildren.push(prevChildren[it])
            continue
          }
         if(prevChildren[it].text === 'white space'){
          flag = true
          continue;
        }
        console.log('y2')
        console.log(e.clientY)
        // console.log('prevChildren[it].y')
        // console.log(prevChildren[it])
        // console.log('prevChildren[it+1]')
        // console.log(prevChildren[it+1])
        
        if(prevChildren[it+1].y > e.clientY   && prevChildren[it].y < e.clientY ){
          console.log('aleeeee')
          flag = true
          newClildren.push(whiteSpaceObj)
        }
          newClildren.push(prevChildren[it])
      }
      // if(flag)
      //   state[i].length++
      state[i].childrens = newClildren
      // console.log('newClildren')
      // console.log(newClildren)
      
    }
   
  }
  
  return state
}


const moveAction = (clientMouse: IclientMouse, left: number, targetDivElemnt:HTMLDivElement,idBlock: string | null,  e:React.MouseEvent, state: Istate[], UpdateBlockAction: Function) => {
  console.log('idBlock')
  console.log(idBlock)
  targetDivElemnt.style.position = 'absolute'
  const calc  = Number(clientMouse.clientX) - left
  targetDivElemnt.style.left = `${calc}px`
  targetDivElemnt.style.top =`${clientMouse.clientY}px`
  UpdateBlockAction(newActionWithWhiteSpace(state,idBlock,e,))

}

export function logKey({
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
return (e:React.MouseEvent) => {
    const obj = {
      clientX:e.clientX.toString(),
      clientY:e.clientY.toString()
    }
    setClientMouse(obj)
    if(flag)
      {
        console.log('isBlockMoved: ',isBlockMoved)
        if(isBlockMoved){
          moveBlock(clientMouse, basis, state, e, targetDiv,UpdateBlockAction )
        }
        else{
          moveAction(clientMouse, left, targetDivElemnt,idBlock, e, state,UpdateBlockAction)
        }
      }

    

  }
}