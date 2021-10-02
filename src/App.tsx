import { off } from 'process';
import React, {useEffect,useRef,createRef, useState, FC} from 'react';
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
  //const [state, UpdateBlockAction] = useState<Istate[]>([])

  const client = useRef<HTMLDivElement>(null)
  const blocks = useRef<HTMLDivElement>(null)
  const [flag,setFlag] = useState<boolean>(false)


  const [updateActions, setApdateActions] = useState<boolean>(false)

  const [targetDiv,setTargetDiv] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [clientMouse,setClientMouse] = useState<IclientMouse>({clientX:'1',clientY:'1'})

  const [isBlockMoved,setIsBlockMoved] = useState<boolean>(false)
  const [targetDivElemnt,setTargetDivElement] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [left,setLeft] = useState<number>(0)

  const [currentAction,setCurrentUction] = useState<children>({} as children)

  
  
  
  // select input propertyes
  const [isSelectInput,setSelectInput] = useState<boolean>(false)
  const [lastClientMouse,setLastClientMouse] = useState<IclientMouse>({} as IclientMouse)
  const eventState  = useTypedSelector( state => state.event )
  const [dataIdEvent,setDataIdEvent] = useState<number>(0)

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
  const obj = state

  blocks.forEach((val, index)=>{
    if(index === obj.length) return
    const bl = val as HTMLDivElement
    const num = bl.getBoundingClientRect().x

    if(obj[index].target !== 1)
      obj[index].left = num

    obj[index].header = state[index].header
    obj[index].id = state[index].id
 
  })
  UpdateBlockAction(obj)

 }, [state])
    

    function destribution(e:React.MouseEvent<HTMLDivElement>){
      setFlag(true)
      let target = e.target as HTMLDivElement
     

      if(target.textContent === 'add values') {setFlag(false); return false}
      
      if(target.className === 'block__header'){
        setSelectInput(true)
        setLastClientMouse({
          clientX:`${e.clientX}`,
          clientY:`${e.clientY}`,
        })

        setDataIdEvent(Number(target.getAttribute('data-id')))
        target = target.parentNode as HTMLDivElement
        
      }

   
      if(target.className === 'actions'){
        setApdateActions(true)
        setIsBlockMoved(false)
        setTargetDivElement(target)
        setLeft(target.getBoundingClientRect().x)
        return false
      }
      else{
        setIsBlockMoved(true)
        setTargetDiv(target)   
        const textTarget = target.querySelector('.block__header')?.textContent?.split(' ').join('');
        state.forEach((val, index) => {
          
          if(val.header === textTarget){
            state[index].target = 1
          } 
        })
      
    }
      return false
    }


  return (
    <>
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
          targetDivElemnt:targetDivElemnt
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
        }
      )
    }>
      <MemoListDiv  destribution = {destribution}/>
      <div className='Mouse Input' ref = {client}></div>
    </div>
    </>
  );
}

export default App;
