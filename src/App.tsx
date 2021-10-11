import React, {useEffect,useRef, useState, FC} from 'react';
import './App.css';
import { useTypedSelector } from './hooks/typedSelector';
import { UseActions } from './hooks/useActionsHook';
import {MemoListDiv} from './list'
import {cleanOut} from './tools/cleanOut'
import {logKey} from './tools/logkey'
import {updateActionSize} from './tools/updateActions' 


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


export interface Istate{
  id:number,
  header:string,
  left:number,
  target: null| number,
  childrens: children[],
  length:number,
}



const  App:FC = ()=> {
  const {UpdateBlockAction,updateEventAction, SetFalse} = UseActions()
  const state  = useTypedSelector( state => state.block )
  const client = useRef<HTMLDivElement>(null)
  const [flag,setFlag] = useState<boolean>(false)
  const [updateActions, setApdateActions] = useState<boolean>(false)
  const [targetDiv,setTargetDiv] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [clientMouse,setClientMouse] = useState<IclientMouse>({clientX:'1',clientY:'1'})
  const [isBlockMoved,setIsBlockMoved] = useState<boolean>(false)
  const [targetDivElemnt,setTargetDivElement] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [left,setLeft] = useState<number>(0)
  const [currentAction,setCurrentUction] = useState<children>({} as children)
  const [isSelectInput,setSelectInput] = useState<boolean>(false)
  const [lastClientMouse,setLastClientMouse] = useState<IclientMouse>({} as IclientMouse)
  const eventState  = useTypedSelector( state => state.event )
  const [dataIdEvent,setDataIdEvent] = useState<number>(0)
  const [idAction,setIdAction] = useState<string | null>(null)
  const [idBlcok,setIdBlcok] = useState<string | null> (null)
  const [basis , setBasis] = useState<number>(0)


  useEffect(() => {
    updateActionSize({
      UpdateBlockAction: UpdateBlockAction,
      setCurrentUction: setCurrentUction,
      state: state,
      targetDivElemnt:targetDivElemnt,
    })
  },[updateActions])



 useEffect (() => {
  const blocks = document.querySelectorAll('.block') 
  blocks.forEach((element, index)=>{
    if(index === state.length) return
    const block = element as HTMLDivElement
    const num = block.getBoundingClientRect().x
    if(state[index].target !== 1)
      state[index].left = num 
  })
  UpdateBlockAction(state)
 }, [state])
  




 const blockHeaderHandler = (e:React.MouseEvent<HTMLDivElement>, target:HTMLDivElement) => {
  setSelectInput(true)
  setLastClientMouse({
    clientX:`${e.clientX}`,
    clientY:`${e.clientY}`,
  })

  setDataIdEvent(Number(target.getAttribute('data-id')))
  return target.parentNode as HTMLDivElement 
 }

 const actionHandler = (e:React.MouseEvent<HTMLDivElement>, target:HTMLDivElement) => {
  setLastClientMouse({
    clientX:`${e.clientX}`,
    clientY:`${e.clientY}`,
  })

  setIdAction(target.getAttribute('data-id'))
  setIdBlcok((target.parentNode?.parentNode as HTMLDivElement).getAttribute('data-id'))

  setApdateActions(true)
  setIsBlockMoved(false)
  setTargetDivElement(target)
  setLeft(target.getBoundingClientRect().x)
 }

 const blockHandler = (e:React.MouseEvent<HTMLDivElement>, target:HTMLDivElement) => {
  setIsBlockMoved(true)
  setTargetDiv(target)   
  const textTarget = target.querySelector('.block__header')?.textContent?.split(' ').join('');

  state.forEach((val, index) => {    
    if(val.header === textTarget){
      state[index].target = 1
    } 
  }) 
 }

  function destribution(e:React.MouseEvent<HTMLDivElement>){
    let target = e.target as HTMLDivElement
    if(target.textContent === 'add values') {setFlag(false); return false}
    setFlag(true)

    const initPosition = target.getBoundingClientRect().x
    const basis = Number(clientMouse.clientX) - initPosition
    setBasis(basis)

    if(target.className === 'block__header'){
      target = blockHeaderHandler(e, target)
    }

    if(target.className === 'actions'){
      actionHandler(e, target)
    }
    else{
      blockHandler(e, target)
    }
    return false
  }


  return (
    <>
    <div className = 'container'>
    <div className = 'root' onKeyDown={() => {console.log('press f pls')}} onMouseMove = {logKey
      (
        {
          UpdateBlockAction: UpdateBlockAction,
          clientMouse: clientMouse,
          flag: flag,
          isBlockMoved: isBlockMoved,
          left: left,
          setClientMouse: setClientMouse,
          state: state,
          targetDiv: targetDiv,
          targetDivElemnt:targetDivElemnt,
          basis:basis,
        }
      )
    } onMouseUp = {
      cleanOut(
        {
          targetDivElemnt: targetDivElemnt,
          isBlockMoved: isBlockMoved,
          setFlag: (boolValue) => setFlag(boolValue),
          setIsBlockMoved: (boolValue) => setIsBlockMoved(boolValue),
          state: state,
          updateActions: updateActions,
          currentAction: currentAction,
          clientMouse: clientMouse,
          setApdateActions: (boolValue) => setApdateActions(boolValue),
          UpdateBlockAction: UpdateBlockAction,
          isSelectInput: isSelectInput,
          lastClientMouse:lastClientMouse,
          updateEventAction: updateEventAction,
          dataIdEvent: dataIdEvent,
          SetFalse: SetFalse,
          eventState:eventState,
          idAction:idAction,
          idBlock:idBlcok
        }
      )
    }>
      <MemoListDiv  destribution = {destribution} idAction = {idAction} idBlock = {idBlcok}/>
      <div className='Mouse Input' ref = {client}></div>
    </div>
    </div>
    </>
  );
}

export default App;
