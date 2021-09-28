import React, { FC, useState } from 'react'
import {Istate} from './App'


interface IListDiv{
  state:Istate[],
  destribution:(e:React.MouseEvent<HTMLDivElement>)=>void,
}


const ListDiv:FC<IListDiv> = ({state,destribution}) => {
  const [header,setHeader] = useState<string>('add text')
  const [isInput,showInput] = useState<boolean>(false)    
    
  function mapping(val: any){

    if(val.header ==='white space')
    return (<div className="block hidden" key={val.id} onMouseDown = {destribution}> 
      {val.header}
    </div>)
    else
    return(<div className="block" key={val.id} onMouseDown = {destribution}> 
              {val.header}
    </div>)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target 
        setHeader(target.value)
  }

    return (
  
      <div>
        <div className='container' onClick = {() => {showInput(false)}}>
          {
            state.map((val) =>
            (mapping(val))
          )}
          
            <div className="blocklast" key={1001} onMouseDown = {destribution} onClick = {(e) => e.stopPropagation()}>
            { 
            (!isInput)
                ? <strong onClick = {(e) => { showInput(true)}} > {header} </strong>
                : <input type = 'text' value = {header}  onChange = {handleInput}/>
            }
            </div>
          
        </div>

        <div className = 'mario'>
         marrrio
        </div>

      </div>


        
    )
}

export const MemoListDiv =  React.memo(ListDiv)