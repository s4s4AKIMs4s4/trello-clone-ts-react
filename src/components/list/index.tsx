import React, { FC, useRef, useState,useEffect } from 'react'
import {Istate,children} from '../../data/board'
import {useTypedSelector} from '../../hooks/typedSelector'
import {UseActions} from '../../hooks/useActionsHook'
import { ChangeModal } from './Modals/changeModal';
import { AddActionModal } from './Modals/addBlockModal';
import { CloseOutlined } from '@ant-design/icons'
import {AddBlockModal} from './Modals/addBlock'

interface IListDiv{
  destribution:(e:React.MouseEvent<HTMLDivElement>)=>void,
  idAction: string | null,
  idBlock: string | null,
}


const ListDiv:FC<IListDiv> = ({destribution, idAction, idBlock}) => {

  const [header,setHeader] = useState<string>('add block')
  
  const {UpdateHeader,UpdateActionHeader} = UseActions()
  const EventState  = useTypedSelector( state => state.event )
  const state  = useTypedSelector( state => state.block )
  const inputRef = useRef<HTMLInputElement>(null)

  const [isModalVisibleChange, setIsModalVisibleChange] = useState(false);
  const [isModalVisibleAddAction, setIsModalVisibleAddAction] = useState(false);
  const [isModalVisibleAddBlock, setIsModalVisibleAddBlock,] = useState(false);
  useEffect(() => {
    if(inputRef.current)
    {
      console.log(inputRef)
      inputRef!.current!.focus()

    }
  }, [EventState])
  
  function mappingBlockWithAction(val:Istate , index: number){

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
                      insertAction(val)
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

  const setAddBlockState = (value: boolean) =>{
    setIsModalVisibleAddBlock(value)
  }
  const showModalBlock = () => {
    setIsModalVisibleAddBlock(true)
  }

  function insertAction(val:children){

    if(val.text !== 'add')
      if(val.text === 'white space')
        return <div className = "actions hiddenAction" key = {val.index} onClick = {showModalChange} data-id = {val.index}>
                <span className = 'text'> {val.text } </span>
                <span className = 'closeIcon'> <CloseOutlined  data-id = "SVG" onClick = {() => {console.log('f');alert('а вот и я неждали!')}}/> </span> 
              </div>
      else  
        return  <div className = "actions" key = {val.index} onClick = {showModalChange} data-id = {val.index}>
                            <span className = 'text'> {val.text } </span>
                            <span className = 'closeIcon'> <CloseOutlined  data-id = "SVG" onClick = {() => {console.log('f');alert('а вот и я неждали!')}}/> </span> 
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
            (mappingBlockWithAction(val, index))
          )}
          <div className="blocklast" key={1001} onClick = {showModalBlock}>
            <strong> {header} </strong>
          </div>
          
        </div>

        <AddBlockModal
          state = {state}
          isModalVisibleChange = {isModalVisibleAddBlock}
          setModalSate ={setAddBlockState}
        />

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