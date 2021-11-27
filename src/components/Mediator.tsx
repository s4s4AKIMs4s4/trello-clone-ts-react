import '../styles/action.scss'
import "../styles/block.scss"

import React, {useEffect, useState, FC} from 'react';
import { useTypedSelector } from '../hooks/typedSelector';
import { UseActions } from '../hooks/useActionsHook';
import {MemoListDiv} from './list/index'
import {useCleanOut, deleteWhitespace} from '../hooks/UseCleanOut'
import {useLogKey} from '../hooks/useLogkey'
import {updateActionSize} from '../tools/updateActions' 
import {IclientMouse,children, Istate} from '../data/board'
import {IfirebaseUser} from '../data/fireBase'
import FireBase from '../abstractions/http/FirebaseApi';


const  App:FC = ()=> {
  const [isMove,setIsMove] = useState<boolean>(false)
  const [isBlockMoved,setIsBlockMoved] = useState<boolean>(false)
  const [isSelectInput,setSelectInput] = useState<boolean>(false)
  const [updateActions, setApdateActions] = useState<boolean>(false)
  //mouse position
  const [clientMouse,setClientMouse] = useState<IclientMouse>({clientX:'1',clientY:'1'})
  const [lastClientMouse,setLastClientMouse] = useState<IclientMouse>({} as IclientMouse)
  //information for current Action and Block
  const [idAction,setIdAction] = useState<string | null>(null)
  const [idBlcok,setIdBlcok] = useState<string | null> (null)
  //Action and Block itself
  const [targetDiv,setTargetDiv] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [targetDivElemnt,setTargetDivElement] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [currentAction,setCurrentUction] = useState<children>({} as children)
  const [actionLeft,setActionLeft] = useState<number>(0)
  const [basis , setBasis] = useState<number>(0)
  //states for data Input in block ([0,length of Blocks])
  const eventState  = useTypedSelector( state => state.event )
  const [dataIdEvent,setDataIdEvent] = useState<number>(0)
  //id current user 
  const [userId,setUserId] = useState<string| null>('')
  //main state of App (set of Blocks and Actions)
  const state  = useTypedSelector( state => state.block )
  //google auth
  const auth  = useTypedSelector( state => state.googleAuth )
  //manipulate bloks and action
  const {UpdateBlockAction,updateEventAction, SetFalse, deleteAction,deleteBlcok} = UseActions()
  //flag to indicate moving block or action
  
  function getUser(users: IfirebaseUser, user:string):[val:string,val1:Istate[]] | undefined{
    for(let [key, val] of Object.entries(users)){
      if(val.email[0] === user){
        return [key, val.initialState]
      }
    }
  }
  useEffect(() => {
    async function fetch(){
      try{
       const users = await FireBase.getUsers()
       let userDate = getUser(users.data, auth.userEmail)
       let idUser: string | null = null

       if(userDate){
        const [key, stateFirebas] = userDate
        UpdateBlockAction(stateFirebas)
        idUser = key
       }
       else{
        const firebaseResponse: any = await FireBase.initNewUser(auth)
        idUser = firebaseResponse.data.name      
       }
       setUserId(idUser)
      }
      catch(err:any){
        console.log(err.message)
      }
    }
    fetch()
  },[])

  function resizeBlocks(){
    const blocks = document.querySelectorAll('.block') 
    blocks.forEach((element, index)=>{
      if(index === state.length) return
      const block = element as HTMLDivElement
      const num = block.getBoundingClientRect().x
      if(state[index].target !== 1)
        state[index].left = num 
    })
    UpdateBlockAction(state)
  }


  useEffect(() => {
    deleteWhitespace(state)
    updateActionSize({
      UpdateBlockAction: UpdateBlockAction,
      setCurrentUction: setCurrentUction,
      state: state,
      targetDivElemnt:targetDivElemnt,
    })
    resizeBlocks()
  },[updateActions])


 useEffect (() => { 
  resizeBlocks()
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
  setApdateActions(true)

  setLastClientMouse({
    clientX:`${e.clientX}`,
    clientY:`${e.clientY}`,
  })

  setIdAction(target.getAttribute('data-id'))
  setIdBlcok((target.parentNode?.parentNode as HTMLDivElement).getAttribute('data-id'))

  setApdateActions(true)
  setIsBlockMoved(false)
  setTargetDivElement(target)
  setActionLeft(target.getBoundingClientRect().x)
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
    
    if(target.className === 'deleteBlock'){
      deleteBlcok(state,(target.parentNode?.parentNode?.parentNode as HTMLDivElement).getAttribute('data-id'))
    }
    setIsMove(true)
    if(target.getAttribute('data-id') === 'sckip'){
      setIdBlcok((target.parentNode?.parentNode as HTMLDivElement).getAttribute('data-id'))
      setIsMove(false);
      setIsBlockMoved(false)
      setApdateActions(false)
      return false
    }
    const initPosition = target.getBoundingClientRect().x
    const basis = Number(e.clientX) - initPosition
    setBasis(basis)
    if(target.className === 'text')
      target = target.parentElement as HTMLDivElement
    
    if(target.className === 'block__header')
      target = blockHeaderHandler(e, target)
    
    if(target.className === 'actions')
      actionHandler(e, target)

    else
      blockHandler(e, target)

    if(target.className === 'closeIcon' || target.parentElement?.tagName === 'SPAN' || target.parentElement?.tagName === 'svg' ){
      const idA = target.parentElement?.parentElement?.parentElement?.getAttribute('data-id')
      const idB = target.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.getAttribute('data-id')
      deleteAction(state,idA,idB)
      setIsMove(false)
    }
    if(target.textContent === 'add') {setIsMove(false); return false}
    return false
  }
  return (
    <>

    <div className = 'MainAppContainer'>
    <div className = 'root'  onMouseMove = {useLogKey
      (
        {
          UpdateBlockAction: UpdateBlockAction,
          clientMouse: clientMouse,
          isMove: isMove,
          isBlockMoved: isBlockMoved,
          ApdateActions: updateActions,
          actionLeft: actionLeft,
          setClientMouse: setClientMouse,
          state: state,
          targetDiv: targetDiv,
          targetDivElemnt:targetDivElemnt,
          basis:basis,
        }
      )
    } onMouseUp = {
      useCleanOut(
        {
          targetDivElemnt: targetDivElemnt,
          isBlockMoved: isBlockMoved,
          setIsMove: (boolValue) => setIsMove(boolValue),
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
          idBlock:idBlcok,
          isMove:isMove,
          userId:userId
        }
      )
    }>
      <MemoListDiv  destribution = {destribution} idAction = {idAction} idBlock = {idBlcok}/>
      
    </div>
    </div>
    </>
  );
}

export default App;
