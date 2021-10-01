import React, { FC, useState } from 'react'
import {Istate} from './App'
import {useTypedSelector} from './hooks/typedSelector'
import {UseActions} from './hooks/useActionsHook'


interface IListDiv{
  state:Istate[],
  destribution:(e:React.MouseEvent<HTMLDivElement>)=>void,
}


const ListDiv:FC<IListDiv> = ({state,destribution}) => {

  const [header,setHeader] = useState<string>('add text')
  const [isInput,showInput] = useState<boolean>(false)    
  
  const {UpdateBlockAction,updateEventAction} = UseActions()
  const EventState  = useTypedSelector( state => state.event )
  
  
  // function HandlerHeader(e:React.MouseEvent<HTMLDivElement>){
  //   console.log('eventState')
  //   console.log(eventState[0])
  // }
  
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
                    : <input type = 'text'  data-id = {val.id} onChange = {handleInput}/>
                  }
                 
                  <div className = "block__element">
                    {val.childrens.map((val:any,index:any) => 
                    
                      <div className = "actions" key = {val.index}>
                        {val.text }
                      </div>

                    )}
                  </div>
        </div>)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target 
    console.log('input value:')
    console.log(target.value)
    // const target = e.target 
        // setHeader(target.value)
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

export const MemoListDiv =  React.memo(ListDiv)