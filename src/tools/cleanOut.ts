import {Istate, children, IclientMouse} from '../App'
import {IState as ISateEvent} from '../store/reducers/event/types'


interface props {
    targetDivElemnt: HTMLDivElement,
    isBlockMoved: boolean, 
    setFlag: (val:boolean) => void,
    setIsBlockMoved: (val:boolean) => void,
    state: Istate[],
    updateActions :boolean,
    currentAction : children, 
    clientMouse:IclientMouse,
    setApdateActions:(val: boolean) => void, 
    UpdateBlockAction: Function,
    isSelectInput: boolean,
    lastClientMouse: IclientMouse,
    updateEventAction: Function
    eventState: ISateEvent,
    dataIdEvent: number,
    SetFalse:Function,
    idAction: string | null,
    idBlock: string | null,
}


function isDeltaMouse(clientMouse: IclientMouse,lastClientMouse: IclientMouse){
  const currentX = Number(clientMouse.clientX)
  const currentY = Number(clientMouse.clientY)
  const lastX = Number(lastClientMouse.clientX)
  const lastY = Number(lastClientMouse.clientY)

  if( currentX !== lastX || currentY !== lastY  ){
    return true
  }
  else{
    return false 
  } 
}
function compare(a:Istate, b:Istate){
  return a.left - b.left
}


function GetFinalBlockPosition(state: Istate[],
  UpdateBlockAction: Function,
  eventState: ISateEvent, 
  isBlockMoved: boolean, 
  SetFalse:Function,  
  setFlag: (val:boolean) => void, 
  setIsBlockMoved: (val:boolean) => void,)
  {
    SetFalse(eventState)
    if(isBlockMoved){
      setFlag(false)
      setIsBlockMoved(false)
      const blocks = document.querySelectorAll('.block') 
      let select = -1
      blocks.forEach((val, index)=>{
        if(index === state.length) return
        const bl = val as HTMLDivElement
        const num = bl.getBoundingClientRect().x 
        if(bl.textContent === 'white space') { select = index; return}
        state[index].left = num
        state[index].id = Math.floor(10000*Math.random())
      })
      if(select !== -1)
        state.splice(select,1)
      state.sort(compare)
      zeroingNullTarget(state)
      UpdateBlockAction(state)
    }
}

function deleteNode(state:Istate[], targetDivElemnt: HTMLDivElement){
  if(!targetDivElemnt.children[0])
    return 
  for(let sIterator = 0; sIterator< state.length;sIterator++){
    const childrens = state[sIterator].childrens
    for(let aIterator = 0 ; aIterator < childrens.length; aIterator++){
      // console.log('targetDivElemnt.children[0].textContent')
      // console.log(targetDivElemnt.children[0].textContent)
      // console.log('childrens[aIterator].text')
      // console.log(childrens[aIterator].text)

      if(targetDivElemnt.children[0].textContent?.split(' ').join('') === childrens[aIterator].text){             
        console.log('ee')
        state[sIterator].childrens.splice(aIterator,1)
        break
      }
    }    
  }
}

export function deleteWhitespace(state:Istate[]){
  for(let i = 0 ; i < state.length;i++){
    for(let it = 0 ; it < state[i].childrens.length;it++){
      if(state[i].childrens[it].text === 'white space'){
        console.log('ddddddddddddddddddddddddddddddddddddddddd')
        state[i].childrens.splice(it,1)
      }
    }
  }
}

function sortY(obj:Istate[]){
      
  obj.forEach((val, it)=>{
    console.log("it: ", it)
    console.log(val.childrens)
    val.childrens.sort(sortingAlgortimY)
  })
}

function sortingAlgortimY(a:children,b:children){
  return a.y - b.y
}


function getNewAction(state:Istate[],clientMouse:IclientMouse,currentAction : children ){
  const action = currentAction
  action.x = Number(clientMouse.clientX)
  action.y = Number(clientMouse.clientY)

  console.log('currentAction: ', currentAction)
  for(let i = 0; i < state.length; i++){
    state[i].length = state[i].childrens.length
    if(i === 0){
      if( state[i].childrens[0].x  >= Number(clientMouse.clientX) ){
        console.log('0')
        action.index = Math.floor(10000 * Math.random())
        state[i].childrens.push(action)
        state[i].length = state[i].childrens.length
        break;
      }
    }
    if(i === state.length - 1){
      if( state[i].childrens[0].x  <= Number(clientMouse.clientX) ){
        console.log('1')
        action.index = Math.floor(10000 * Math.random())
        state[i].childrens.push(action)
        state[i].length = state[i].childrens.length
      }
      break;
    }

    if( (state[i].childrens[0].x <= Number(clientMouse.clientX) )  && (  Number(clientMouse.clientX) <= state[i+1].childrens[0].x))  {
      action.index = Math.floor(10000 * Math.random())
      state[i].childrens.push(action) 
      state[i].length = state[i].childrens.length
    }
  }
}

function zeroingNullTarget(state: Istate[]) {
  state.forEach((val)=>{
    val.target = null
  })
}
function getFinalActionPositions(
  state: Istate[],
   currentAction : children,
   targetDivElemnt: HTMLDivElement, 
   clientMouse:IclientMouse, 
   UpdateBlockAction: Function, 
   setApdateActions:(val: boolean) => void)
  {


    console.log('targetDivElemnt')
    console.log(targetDivElemnt)
    console.log('currentAction')
    console.log(currentAction)
    deleteNode(state, targetDivElemnt)
    deleteWhitespace(state)
    getNewAction(state,clientMouse,currentAction)

    sortY(state)
    UpdateBlockAction(state)        
    setApdateActions(false)
}

export function cleanOut({
    targetDivElemnt,
    isBlockMoved,
    setFlag,
    setIsBlockMoved,
    state,
    updateActions,
    currentAction,
    clientMouse,
    setApdateActions,
    UpdateBlockAction,
    isSelectInput,
    lastClientMouse,
    updateEventAction,
    dataIdEvent,
    SetFalse,
    eventState,
    idAction,
    idBlock,
} : props )

{
  return () => {
      if( isDeltaMouse(clientMouse,lastClientMouse)  )
      { 
        SetFalse(eventState)
        if(isBlockMoved){
          GetFinalBlockPosition(
            state,
            UpdateBlockAction,
            eventState, 
            isBlockMoved, 
            SetFalse,  
            setFlag, 
            setIsBlockMoved)
        }
        if(updateActions){
          getFinalActionPositions(
            state,
            currentAction,
            targetDivElemnt, 
            clientMouse, 
            UpdateBlockAction, 
            setApdateActions)
        } 
        setFlag(false)
    }
    else{
      
      if(!updateActions)
      {
      zeroingNullTarget(state)
      UpdateBlockAction(state)
      updateEventAction(dataIdEvent,true)
      setFlag(false)
      setIsBlockMoved(false)}
      setApdateActions(false)
      setFlag(false)
      setIsBlockMoved(false)
    }

  }
  
}