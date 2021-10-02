import React, { FC, useRef, useState,useEffect } from 'react'
import {Istate,children} from './App'
import {useTypedSelector} from './hooks/typedSelector'
import {UseActions} from './hooks/useActionsHook'


interface IListDiv{
  destribution:(e:React.MouseEvent<HTMLDivElement>)=>void
}


const ListDiv:FC<IListDiv> = ({destribution}) => {

  const [header,setHeader] = useState<string>('add text')
  const [isInput,showInput] = useState<boolean>(false)    
  
  const {UpdateBlockAction,updateEventAction,UpdateHeader} = UseActions()
  const EventState  = useTypedSelector( state => state.event )
  const state  = useTypedSelector( state => state.block )
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
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
        <div className="block" key={val.id}  onMouseDown = {destribution} >
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


  function insertAdd(val:children){

    if(val.text !== 'add')
    return  <div className = "actions" key = {val.index}>
                        {val.text }
                      </div>
    else
    return <div className = "actions add" key = {val.index}>
                        {val.text }
                      </div>                  

  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const target = e.target 
    UpdateHeader(target.value,Number(target.getAttribute('data-id')))
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



      </div>


        
    )
}

export const MemoListDiv =  ListDiv