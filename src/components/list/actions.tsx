import { FC } from "react";
import { children } from "../../data/board";
import { CloseOutlined } from '@ant-design/icons'

interface IAction{
    val:children,
    setAddModalState:(value:boolean) => void,
    showModalChange:() => void,
}
//not work 
export const ActionAdd:FC<IAction> = ({val,setAddModalState,showModalChange} ) => {
    return <div className = "actions" key = {val.index} onClick = {(e) =>{setAddModalState(true)} }>
    {val.text }
  </div> 
}
export const Action:FC<IAction> = ({val,setAddModalState,showModalChange} ) => {
    return <div className = "actions" key = {val.index} onClick = {showModalChange} data-id = {val.index}>
            <span className = 'text'> {val.text } </span>
            <span className = 'closeIcon'> <CloseOutlined  data-id = "SVG" onClick = {() => {console.log('f');alert('а вот и я неждали!')}}/> </span> 
        </div>
}
export const ActionHidden:FC<IAction> = ({val,setAddModalState,showModalChange} ) => {
    return <div className = "actions hiddenAction" key = {val.index} onClick = {showModalChange} data-id = {val.index}>
            <span className = 'text'> {val.text } </span>
            <span className = 'closeIcon'> <CloseOutlined  data-id = "SVG" onClick = {() => {console.log('f');alert('а вот и я неждали!')}}/> </span> 
          </div>
}



