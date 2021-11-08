import React, {useEffect,useRef, useState, FC} from 'react';
import '../styles/card.scss'
import { useTypedSelector } from '../hooks/typedSelector';
import { UseActions } from '../hooks/useActionsHook';
import {MemoListDiv} from './list/index'
import {cleanOut, deleteWhitespace} from '../tools/cleanOut'
import {useLogKey} from '../hooks/useLogkey'
import {updateActionSize} from '../tools/updateActions' 
import {IclientMouse,children, Istate} from '../data/board'
import "../styles/App.scss"
import {initialState} from '../store/reducers/block/index'
import {AxiosResponse } from 'axios'
import axios from 'axios'
import firebase from '../utils/firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import Login from './Login';
import Logout from './Logout';
import { IState } from '../store/reducers/block/types';

export interface IfirebaseUser{
  [id:string]:{
    email:Array<string>,
    initialState: IState[]
  }
  

}
export type firebase = Array<IfirebaseUser>


const  App:FC = ()=> {
  const {UpdateBlockAction,updateEventAction, SetFalse, deleteAction} = UseActions()
  const state  = useTypedSelector( state => state.block )
  const auth  = useTypedSelector( state => state.googleAuth )
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
  const [fireKey,setfireKey] = useState<string>('')
  const [flagUpdateAction,setFlagUpdateAction] = useState<boolean>(false)
  
  function getUser(users: IfirebaseUser, user:string):[val:string,val1:Istate[]] | undefined{
    console.log(user)
    for(let [key, val] of Object.entries(users)){
      console.log(key)
      console.log(val.email[0])

      if(val.email[0] === user)
        console.log('here')
        return [key, val.initialState]
    }
    
    
  }
  useEffect(() => {
    async function fetch(){
      const url = 'https://quize-e13b8-default-rtdb.europe-west1.firebasedatabase.app'
      const trello = 'trello'
      const email = 'akimovivan388@gmail.com'
      const db = getFirestore(firebase);
     // console.log(db)
      const firebaseInit = {
        email:[email],
        initialState
      }
      //const p = {header:'title'}
      let key:string = ''
      try{
       //console.log(JSON.stringify(firebaseInit))
       const users =  await axios.get('https://trello-b4421-default-rtdb.europe-west1.firebasedatabase.app/notes.json')
       let userDate = getUser(users.data, auth.userEmail)
       console.log(userDate)
       if(userDate){
        const [key, stateFirebas] = userDate
        console.log('key')
        console.log(stateFirebas)
        UpdateBlockAction(stateFirebas as Istate[])
        setfireKey(key)
        console.log('I am here')
       }
       else{
       //  key = await axios.post('https://trello-b4421-default-rtdb.europe-west1.firebasedatabase.app/notes.json', JSON.stringify(firebaseInit))
       }
    //   console.log(users.data, auth.userEmail)
       //const id = await axios.patch('https://trello-b4421-default-rtdb.europe-west1.firebasedatabase.app/notes/-MnpgMsmvXpch7VoO9yz.json',JSON.stringify(firebaseInit))
       // const id = await axios.put('https://trello-b4421-default-rtdb.europe-west1.firebasedatabase.app/notes/-MnpgMsmvXpch7VoO9yz.json',JSON.stringify(firebaseInit))
      //  console.log(auth.userEmail)
        // const id = await axios.post('https://trello-b4421-default-rtdb.europe-west1.firebasedatabase.app/notes.json', JSON.stringify(firebaseInit))
      }
      catch(err:any){
        console.log(err.message)
      }
     
    }
    console.log(fetch())
  },[])
  useEffect(() => {
    deleteWhitespace(state)
    updateActionSize({
      UpdateBlockAction: UpdateBlockAction,
      setCurrentUction: setCurrentUction,
      state: state,
      targetDivElemnt:targetDivElemnt,
    })
    const blocks = document.querySelectorAll('.block') 
    blocks.forEach((element, index)=>{
    if(index === state.length) return
    const block = element as HTMLDivElement
    const num = block.getBoundingClientRect().x
    if(state[index].target !== 1)
      state[index].left = num 
  })
  UpdateBlockAction(state)
  console.log(fireKey)
  if(fireKey !== ''){
    const firebaseInit = {
      email:[auth.userEmail],
      initialState:state
    }
    axios.patch(`https://trello-b4421-default-rtdb.europe-west1.firebasedatabase.app/notes/${fireKey}.json`,JSON.stringify(firebaseInit)).then(()=>{console.log('Ok')})
    
  }
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
  console.log(fireKey)
  if(fireKey !== ''){
    const firebaseInit = {
      email:[auth.userEmail],
      initialState:state
    }
    axios.patch(`https://trello-b4421-default-rtdb.europe-west1.firebasedatabase.app/notes/${fireKey}.json`,JSON.stringify(firebaseInit)).then(()=>{console.log('Ok')})
  }
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
    
    setFlag(true)
    const initPosition = target.getBoundingClientRect().x
    const basis = Number(clientMouse.clientX) - initPosition
    setBasis(basis)
    if(target.className === 'text'){
      target = target.parentElement as HTMLDivElement
    }
    if(target.className === 'block__header'){
      target = blockHeaderHandler(e, target)
    }

    if(target.className === 'actions'){
      setFlagUpdateAction(true)
      actionHandler(e, target)
    }
    else{
      blockHandler(e, target)
    }
    
    if(target.className === 'closeIcon' || target.parentElement?.tagName === 'SPAN' ){
      const idA = target.parentElement?.parentElement?.parentElement?.getAttribute('data-id')
      const idB = target.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.getAttribute('data-id')
      deleteAction(state,idA,idB)
      setFlag(false)
    }
    if(target.textContent === 'add') {setFlag(false); return false}
    return false
  }


  return (
    <>
    {/* <Login/>
    <Logout/> */}
    <div className = 'container'>
    <div className = 'root'  onMouseMove = {useLogKey
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
          idBlock:idBlcok,
          setFlagUpdateAction:setFlagUpdateAction,
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
          idBlock:idBlcok,
          flag:flag,
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
