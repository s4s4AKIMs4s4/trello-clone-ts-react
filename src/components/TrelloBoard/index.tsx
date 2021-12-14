import React, { FC, useRef, useState,useEffect, useCallback } from 'react'
import {Istate} from '../../data/board'
import {useTypedSelector} from '../../hooks/typedSelector'
import {UseActions} from '../../hooks/useActionsHook'
import { ChangeModal } from './Modals/changeModal';
import { AddActionModal } from './Modals/addBlockModal';
import {AddBlockModal} from './Modals/addBlock'
import { Button } from 'antd';
import {MemoBlcok} from './Blocks/Block';
import {MemoHiddenBlock} from './Blocks/HiddenBlock';
import _ from "lodash";

interface IListDiv{
  destribution:(e:React.MouseEvent<HTMLDivElement>)=>void,
  idAction: string | null,
  idBlock: string | null,
  userId:string | null
}


const TrelloBoard:FC<IListDiv> = ({destribution, idAction, idBlock,userId}) => {
  
  const {UpdateHeader} = UseActions()
  const auth  = useTypedSelector( state => state.googleAuth )

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
              handleInput={debouncedChangeHandler}
              index={index}
              inputRef={inputRef}
              setAddModalState={setAddModalState}
              showModalChange={showModalChange}
              val={val}
           />
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target 
    console.log(e.target)
    console.log(userId)
    UpdateHeader(target.value,Number(target.getAttribute('data-id')), state, userId, auth)
  }
  
  const debouncedChangeHandler = useCallback(
    _.debounce(handleInput, 300)
  , [state,userId]);

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
          userId={userId}
        />

        <ChangeModal 
          state = {state} 
          idAction = {idAction}
          idBlock = {idBlock}
          isModalVisibleChange = {isModalVisibleChange}
          changeModalSate = {changeModalState}
          userId={userId}
        />

        <AddActionModal  
          setModalSate = {setAddModalState} 
          isModalVisibleChange = {isModalVisibleAddAction}
          idAction = {idAction}
          idBlock = {idBlock}
          state = {state}
          userId={userId}
        />
      </div>
    )
}

export const MemoTrelloBoard =  React.memo(TrelloBoard)