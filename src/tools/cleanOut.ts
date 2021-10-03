import React from 'react'
import {Istate, children, IclientMouse} from '../App'
import {UseActions} from '../hooks/useActionsHook'
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
  console.log('delta mouse')
  const currentX = Number(clientMouse.clientX)
  const currentY = Number(clientMouse.clientY)

  const lastX = Number(lastClientMouse.clientX)
  const lastY = Number(lastClientMouse.clientY)

  console.log('current')
  console.log(currentX)
  console.log(currentY)

  console.log('last')
  console.log(lastX)
  console.log(lastY)

  if( currentX !== lastX || currentY !== lastY  ){
    console.log('t')
    return true
  }
  else{
    console.log('f')
    return false 
  } 
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
      console.log('inside is')
    SetFalse(eventState)
    if(isBlockMoved){
      setFlag(false)
      setIsBlockMoved(false)
      const blocks = document.querySelectorAll('.block') 
      
      const obj = state
      let select = -1
      blocks.forEach((val, index)=>{
        if(index === obj.length) return
        const bl = val as HTMLDivElement
        //console.log(bl.getBoundingClientRect())
        const num = bl.getBoundingClientRect().x 
        if(bl.textContent === 'white space') { select = index; return}
        obj[index].left = num
        // obj[index].header = bl.textContent as string
        obj[index].id = Math.floor(10000*Math.random())
        obj[index].target = null


      })
      if(select !== -1)
        obj.splice(select,1)
      obj.sort(compare)
      UpdateBlockAction(obj)
    }
    if(updateActions){
      let obj = state
      const actions = document.querySelectorAll('.actions') 


      const action = currentAction
      deleteNode(obj, state, targetDivElemnt)
      for(let i = 0; i < obj.length; i++){
        
       obj[i].length = obj[i].childrens.length
        if(i === 0){
          if( obj[i].childrens[0].x  >= Number(clientMouse.clientX) ){
            console.log('0')
            action.index = Math.floor(10000 * Math.random())
            obj[i].childrens.push(action)
            obj[i].length = obj[i].childrens.length
            break;
          }
        }
        if(i === obj.length - 1){
          if( obj[i].childrens[0].x  <= Number(clientMouse.clientX) ){
            console.log('1')
            action.index = Math.floor(10000 * Math.random())
            obj[i].childrens.push(action)
            obj[i].length = obj[i].childrens.length
          }
          break;
        }

        if( (obj[i].childrens[0].x <= Number(clientMouse.clientX) )  && (  Number(clientMouse.clientX) <= obj[i+1].childrens[0].x))  {
          action.index = Math.floor(10000 * Math.random())
          obj[i].childrens.push(action) 
          obj[i].length = obj[i].childrens.length
        }

      }

      sortY(obj)
      UpdateBlockAction(obj)        
      setApdateActions(false)
    }
    
  }
  else{
    if(!updateActions)
    {console.log('it is here')
    updateEventAction(dataIdEvent,true)
    setFlag(false)
    setIsBlockMoved(false)}
    setApdateActions(false)
    setFlag(false)
    setIsBlockMoved(false)
  }

  }


  function compare(a:Istate, b:Istate){
    return a.left - b.left
  }

  function deleteNode(obj:Istate[], state:Istate[], targetDivElemnt: HTMLDivElement){
      
    for(let sIterator = 0; sIterator< state.length;sIterator++){
      const childrens = obj[sIterator].childrens
      for(let aIterator = 0 ; aIterator < childrens.length; aIterator++){
        if(targetDivElemnt.textContent === childrens[aIterator].text){             
          obj[sIterator].childrens.splice(aIterator,1)
          //UpdateBlockAction(obj)
          //childrens.splice(aIterator,1)
          break
        }
      }    
    }
}

function sortY(obj:Istate[]){
      
    obj.forEach((val)=>{
      val.childrens.sort(sortingAlgortimY)
    })
    //UpdateBlockAction(obj)
  }

  function sortingAlgortimY(a:children,b:children){
    return a.y - b.y
  }

}