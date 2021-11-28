import React, { FC, useRef, useState,useEffect } from 'react'
import {Istate} from '../../data/board'
import {useTypedSelector} from '../../hooks/typedSelector'
import {UseActions} from '../../hooks/useActionsHook'
import { ChangeModal } from './Modals/changeModal';
import { AddActionModal } from './Modals/addBlockModal';
import {AddBlockModal} from './Modals/addBlock'
import { Button } from 'antd';
import {MemoBlcok} from '../Blocks/Block';
import {MemoHiddenBlock} from '../Blocks/HiddenBlock';

interface IListDiv{
  destribution:(e:React.MouseEvent<HTMLDivElement>)=>void,
  idAction: string | null,
  idBlock: string | null,
}


const ListDiv:FC<IListDiv> = ({destribution, idAction, idBlock}) => {
  
  const {UpdateHeader} = UseActions()
  const EventState  = useTypedSelector( state => state.event )
  const state  = useTypedSelector( state => state.block )
  const inputRef = useRef<HTMLInputElement>(null)

  const [isModalVisibleChange, setIsModalVisibleChange] = useState(false);
  const [isModalVisibleAddAction, setIsModalVisibleAddAction] = useState(false);
  const [isModalVisibleAddBlock, setIsModalVisibleAddBlock,] = useState(false);
  
  useEffect(() => {
    if(inputRef.current)
    {
      inputRef!.current!.focus()
    }
  }, [EventState])
  
  function mappingBlockWithAction(val:Istate , index: number){

    if(val.header ==='white space')
      return <MemoHiddenBlock 
                key={val.id}
                destribution={destribution}
                val={val} 
              />
    else
      return<MemoBlcok 
              key={val.id} 
              destribution={destribution}
              handleInput={handleInput}
              index={index}
              inputRef={inputRef}
              setAddModalState={setAddModalState}
              showModalChange={showModalChange}
              val={val}
           />
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
  
      <div>
        <div className='container'  >
          {
            state.map((val, index) =>
            (mappingBlockWithAction(val, index))
          )}
          <div className="blocklast" key={1001} onClick = {showModalBlock}>
            <Button className = "addBlockButton"> Add block </Button>
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