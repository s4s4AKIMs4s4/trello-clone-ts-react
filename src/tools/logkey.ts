import {IclientMouse, Istate} from '../App'


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
}




const constructNewSateWithWhiteSpace = (e:React.MouseEvent, state: Istate[]) => {
  const newState = [] as Istate[]
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

const moveAction = (clientMouse: IclientMouse, left: number, targetDivElemnt:HTMLDivElement) => {
  targetDivElemnt.style.position = 'absolute'
  const calc  = Number(clientMouse.clientX) - left
  targetDivElemnt.style.left = `${calc}px`
  targetDivElemnt.style.top =`${clientMouse.clientY}px`
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
    basis}: props) 
{
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
          moveAction(clientMouse, left, targetDivElemnt)

        }
      }

    

  }
}