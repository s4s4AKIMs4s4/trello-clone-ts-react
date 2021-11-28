import React,{ FC } from "react";
import {useTypedSelector} from '../../hooks/typedSelector'
import {Istate,children} from '../../data/board'
import { Action, ActionAdd, ActionHidden } from '../list/actions';
interface IProps{
    val: Istate,
    index:number,
    inputRef:React.RefObject<HTMLInputElement>,
    showModalChange:() => void,
    setAddModalState:(val:boolean) => void,
    destribution:(e: React.MouseEvent<HTMLDivElement> ) => void,
    handleInput: (e:React.ChangeEvent<HTMLInputElement>) => void,
}

interface IHidden{
    val: Istate,
    destribution:(e: React.MouseEvent<HTMLDivElement> ) => void,
}

export const Block:FC<IProps> = ({val, index,inputRef,destribution,handleInput,setAddModalState,showModalChange}) => {
    const EventState  = useTypedSelector( state => state.event )
    function insertAction(val:children){
        if(val.text !== 'add')
          if(val.text === 'white space')
            return <ActionHidden  key ={val.index} showModalChange ={showModalChange} setAddModalState ={setAddModalState} val = {val} />
          else  
            return  <Action key ={val.index} showModalChange ={showModalChange} setAddModalState={setAddModalState} val={val}/>
        else
        return <ActionAdd key ={val.index} val ={val} setAddModalState = {setAddModalState} showModalChange = {showModalChange}/>                
      }

     return <div className="block" data-id = {val.id}  onMouseDown = {destribution} >
        {(!EventState[index]) 
            ? <div  className = "block__header"  data-id = {index}> {val.header} </div>
            : <input type = 'text' ref = {inputRef}  data-id = {val.id} onChange = {handleInput}/>
        }
        <div className = "block__element">
        {val.childrens.map((val:children,index:any) => 
            insertAction(val)
        )}
     </div>
</div>
}

export const HiddenBlcok:FC<IHidden> = ({val, destribution}) =>{
    return <div className="block hidden"  onMouseDown = {destribution} > 
    {val.header}
  </div>
}