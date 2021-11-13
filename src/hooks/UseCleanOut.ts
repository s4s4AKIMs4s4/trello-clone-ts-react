import axios from 'axios'
import {Istate, children, IclientMouse} from '../data/board'
import { useTypedSelector } from './typedSelector'
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
    flag: boolean,
    fireKey: string
}

export function deleteWhitespace(state:Istate[]){
  for(let i = 0 ; i < state.length;i++){
    for(let it = 0 ; it < state[i].childrens.length;it++){
      if(state[i].childrens[it].text === 'white space'){
        state[i].childrens.splice(it,1)
      }
    }
  }
  
}


export function CleanOut({
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
    lastClientMouse,
    updateEventAction,
    dataIdEvent,
    SetFalse,
    eventState,
    flag,
    fireKey,
} : props )

{
  const auth  = useTypedSelector( state => state.googleAuth )

  function isDeltaMouse(){
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
  
  
  function GetFinalBlockPosition()
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
          state[index].id = Math.floor(1000* Math.random())  * Math.floor(1000* Math.random()) *  Math.floor(1000* Math.random())
        })
        if(select !== -1)
          state.splice(select,1)
        state.sort(compare)
        zeroingNullTarget()
        UpdateBlockAction(state)
      }
  }
  
  function deleteNode(state:Istate[], targetDivElemnt: HTMLDivElement){
    if(!targetDivElemnt.children[0])
      return 
    for(let sIterator = 0; sIterator< state.length;sIterator++){
      const childrens = state[sIterator].childrens
      for(let aIterator = 0 ; aIterator < childrens.length; aIterator++){
        if(targetDivElemnt.children[0].textContent?.split(' ').join('') === childrens[aIterator].text?.split(' ').join('')){             
          state[sIterator].childrens.splice(aIterator,1)
          break
        }
      }    
    }
  }
  
 
  
  function sortY(){    
    state.forEach((val, it)=>{
      val.childrens.sort(sortingAlgortimY)
    })
  }
  
  function sortingAlgortimY(a:children,b:children){
    return a.y - b.y
  }
  
  
  function getNewAction(){
    const action = currentAction
    action.x = Number(clientMouse.clientX)
    action.y = Number(clientMouse.clientY)
    for(let i = 0; i < state.length; i++){
      state[i].length = state[i].childrens.length
      if(i === 0){
        if( state[i].childrens[0].x  >= Number(clientMouse.clientX) ){
          action.index = Date.now()
          state[i].childrens.push(action)
          state[i].length = state[i].childrens.length
          break;
        }
      }
      if(i === state.length - 1){
        if( state[i].childrens[0].x  <= Number(clientMouse.clientX) ){
          action.index = Date.now()
          state[i].childrens.push(action)
          state[i].length = state[i].childrens.length
        }
        break;
      }
  
      if( (state[i].childrens[0].x <= Number(clientMouse.clientX) )  && (  Number(clientMouse.clientX) <= state[i+1].childrens[0].x))  {
        action.index = Date.now()
        state[i].childrens.push(action) 
        state[i].length = state[i].childrens.length
      }
    }
  }
  
  function zeroingNullTarget() {
    state.forEach((val)=>{
      val.target = null
    })
  }
  function getFinalActionPositions()
    {
  
      deleteNode(state, targetDivElemnt)
      deleteWhitespace(state)
      getNewAction()
  
      sortY()
      UpdateBlockAction(state)        
      setApdateActions(false)
      deleteWhitespace(state)
  }
  function deleteWhiteBlock(){
    for(let i = 0 ; i < state.length;i++){
        if(state[i].header === 'white space'){
          state.splice(i,1)
        }    
    }
  }
  return () => {
   // deleteWhiteBlock()
      if( isDeltaMouse()  )
      { 
        
        SetFalse(eventState)
        if(isBlockMoved){
          GetFinalBlockPosition()
        }
        if(!flag)
          return
        if(updateActions){
          getFinalActionPositions()
        } 
        setFlag(false)
    }
    else{
      
      if(!updateActions)
      {
      zeroingNullTarget()
      UpdateBlockAction(state)
      updateEventAction(dataIdEvent,true)
      setFlag(false)
      setIsBlockMoved(false)}
      setApdateActions(false)
      setFlag(false)
      setIsBlockMoved(false)
    }
    deleteWhiteBlock()
    if(fireKey !== ''){
      const firebaseInit = {
        email:[auth.userEmail],
        initialState:state
      }
      axios.patch(`https://trello-b4421-default-rtdb.europe-west1.firebasedatabase.app/notes/${fireKey}.json`,JSON.stringify(firebaseInit)).then(()=>{console.log('Ok')})
    }

  }
  
}