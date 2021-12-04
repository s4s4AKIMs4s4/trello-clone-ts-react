import {Istate, children, IclientMouse} from '../data/board'
import { useTypedSelector } from './typedSelector'
import {IState as ISateEvent} from '../store/reducers/event/types'
import FireBase from '../abstractions/http/FirebaseApi'

interface props {
    targetDivElemnt: HTMLDivElement,
    isBlockMoved: boolean, 
    setIsMove: (val:boolean) => void,
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
    isMove: boolean,
    userId: string | null
}

export function   deleteWhitespace(state:Istate[]){
  for(let i = 0 ; i < state.length;i++){
    for(let it = 0 ; it < state[i].childrens.length;it++){
      if(state[i].childrens[it].text === 'white space'){
        state[i].childrens.splice(it,1)
      }
    }
  }
  
}


export function useCleanOut({
    targetDivElemnt,
    isBlockMoved,
    setIsMove,
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
    isMove,
    userId,
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
        setIsMove(false)
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
  
  function deleteOldAction(state:Istate[], targetDivElemnt: HTMLDivElement){
    if(!targetDivElemnt.children[0])
      return 
    for(let sIterator = 0; sIterator< state.length;sIterator++){
      const childrens = state[sIterator].childrens
      for(let aIterator = 0 ; aIterator < childrens.length; aIterator++){
        //replace with comparsion by ID
        if(targetDivElemnt.children[0].textContent?.split(' ').join('') === childrens[aIterator].text?.split(' ').join('')){             
          state[sIterator].childrens.splice(aIterator,1)
          break
        }
      }    
    }
  }
  
 
  
  function sortY(){    
    state.forEach((val)=>{
      val.childrens.sort(sortingAlgortimY)
    })
  }
  
  function sortingAlgortimY(a:children,b:children){
    return a.y - b.y
  }
  
  
  function putInBlockNewAction(){
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
  function CreateNewActionPositions()
    {
  
      deleteOldAction(state, targetDivElemnt)
      deleteWhitespace(state)
      putInBlockNewAction()
  
      sortY()
      UpdateBlockAction(state)        
      setApdateActions(false)
      deleteWhitespace(state)
  }
  return () => {
      if( isDeltaMouse()  )
      { 
        
        SetFalse(eventState)
        if(isBlockMoved){
          GetFinalBlockPosition()
        }
        if(!isMove)
          return
        if(updateActions){
          CreateNewActionPositions()
          setTimeout(() =>{
            deleteWhitespace(state)
          })
        } 
        setIsMove(false)
    }
    else{
      if(!updateActions){
        zeroingNullTarget()
        UpdateBlockAction(state)
        updateEventAction(dataIdEvent,true)
        setIsMove(false)
        setIsBlockMoved(false)}
        setApdateActions(false)
        setIsMove(false)
        setIsBlockMoved(false)
    }
    if(userId !== ''){
      FireBase.sendData(auth,state,userId).then(() => console.log('ok') )
    }
  }
  
}