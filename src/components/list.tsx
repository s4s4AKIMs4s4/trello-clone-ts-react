import React, { FC, useRef, useState,useEffect, HtmlHTMLAttributes } from 'react'
import {Istate,children} from '../App'
import {useTypedSelector} from '../hooks/typedSelector'
import {UseActions} from '../hooks/useActionsHook'
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { ChangeModal } from './Modals/changeModal';
import { AddActionModal } from './Modals/addBlockModal';
import { CloseOutlined } from '@ant-design/icons'

interface IListDiv{
  destribution:(e:React.MouseEvent<HTMLDivElement>)=>void,
  idAction: string | null,
  idBlock: string | null,
}


const ListDiv:FC<IListDiv> = ({destribution, idAction, idBlock}) => {

  const [header,setHeader] = useState<string>('add block')
  const [isInput,showInput] = useState<boolean>(false)    
  
  const {UpdateHeader,UpdateActionHeader} = UseActions()
  const EventState  = useTypedSelector( state => state.event )
  const state  = useTypedSelector( state => state.block )
  const inputRef = useRef<HTMLInputElement>(null)

  const [isModalVisibleChange, setIsModalVisibleChange] = useState(false);
  const [isModalVisibleAddAction, setIsModalVisibleAddAction] = useState(false);

  const [hederChange,setGeaderChange] = useState<string>('null')

  useEffect(() => {
    console.log(idAction)
    console.log(idBlock)
    if(inputRef.current)
    {
      console.log(inputRef)
      inputRef!.current!.focus()

    }
  }, [EventState])
  

  
  function mapping(val:Istate , index: number){

    if(val.header ==='white space')
    return (
      <div className="block hidden" key={val.id} onMouseDown = {destribution} > 
        {val.header}
      </div>)
    else
      return(
        <div className="block" key={val.id} data-id = {val.id}  onMouseDown = {destribution} >
                  {(!EventState[index]) 
                    ? <div  className = "block__header"  data-id = {index}> {val.header} </div>
                    : <input type = 'text' ref = {inputRef}  data-id = {val.id} onChange = {handleInput}/>
                  }
                 
                  <div className = "block__element">
                    {val.childrens.map((val:children,index:any) => 
                    
                      insertAdd(val)

                    )}
                  </div>
        </div>)
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const target = e.target 
    UpdateHeader(target.value,Number(target.getAttribute('data-id')))
  }

  const showModalChange = () => {
    setIsModalVisibleChange(true);
  };

  const changeModalState = (value: boolean ) =>{
    setIsModalVisibleChange(value)
  }

  const setAddModalState = (value: boolean ) =>{
    setIsModalVisibleAddAction(value)
  }


  

  function insertAdd(val:children){

    if(val.text !== 'add')
    return  <div className = "actions" key = {val.index} onClick = {showModalChange} data-id = {val.index}>
                        <span className = 'text'> {val.text } </span>
                        <span className = 'closeIcon'> <CloseOutlined /> </span> 
            </div>
    else
    return <div className = "actions" key = {val.index} onClick = {(e) =>{setAddModalState(true)} }>
                        {val.text }
                      </div>                  

  }


    return (
  
      <div>
        <div className='container' >
          {
            state.map((val, index) =>
            (mapping(val, index))
          )}
          
            <div className="blocklast" key={1001} onMouseDown = {destribution} onClick = {(e) => e.stopPropagation()}>
            { 
            (!isInput)
                ? <strong onClick = {(e) => { showInput(true)}} > {header} </strong>
                : <input type = 'text' value = {header}  onChange = {handleInput}/>
            }
            </div>
          
        </div>


        <ChangeModal 
          state = {state} 
          idAction = {idAction}
          idBlock = {idBlock}
          isModalVisibleChange = {isModalVisibleChange}
          changeModalSate = {changeModalState}
        />

        <AddActionModal  
          setModalSate = {setAddModalState} 
          isModalVisibleChange = {isModalVisibleAddAction}
          idAction = {idAction}
          idBlock = {idBlock}
          state = {state}
        />

      </div>


        
    )
}

export const MemoListDiv =  ListDiv