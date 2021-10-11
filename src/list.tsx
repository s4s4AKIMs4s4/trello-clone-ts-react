import React, { FC, useRef, useState,useEffect, HtmlHTMLAttributes } from 'react'
import {Istate,children} from './App'
import {useTypedSelector} from './hooks/typedSelector'
import {UseActions} from './hooks/useActionsHook'
import { Modal, Button } from 'antd';
import { Input } from 'antd';

interface IListDiv{
  destribution:(e:React.MouseEvent<HTMLDivElement>)=>void,
  idAction: string | null,
  idBlock: string | null,
}


const ListDiv:FC<IListDiv> = ({destribution, idAction, idBlock}) => {

  const [header,setHeader] = useState<string>('add block')
  const [isInput,showInput] = useState<boolean>(false)    
  
  const {UpdateBlockAction,updateEventAction,UpdateHeader,UpdateActionHeader} = UseActions()
  const EventState  = useTypedSelector( state => state.event )
  const state  = useTypedSelector( state => state.block )
  const inputRef = useRef<HTMLInputElement>(null)

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    UpdateActionHeader(state,idBlock,idAction,hederChange)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function insertAdd(val:children){

    if(val.text !== 'add')
    return  <div className = "actions" key = {val.index} onClick = {showModal} data-id = {val.index}>
                        {val.text }
                      </div>
    else
    return <div className = "actions add" key = {val.index}>
                        {val.text }
                      </div>                  

  }



  const handlerInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setGeaderChange(e.target.value)
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

        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>idAction - {idAction} </p>
        <p>id block - {idBlock}</p>
        <p>add new header</p>
        <Input placeholder="Basic usage" onChange = {handlerInput}/>
        

        </Modal>

      </div>


        
    )
}

export const MemoListDiv =  ListDiv