import { FC } from "react";
import { children } from "../../data/board";
import { CloseOutlined } from '@ant-design/icons'

interface IAction{
    val:children,
    setAddModalState:(value:boolean) => void,
    showModalChange:() => void,
}
export const ActionAdd:FC<IAction> = ({val,setAddModalState,showModalChange} ) => {
  const style = {
    backgroundColor:'transparent',
    boxShadow:  '0 0 0' ,
  }

    return <div className = "actions" data-id = "sckip"style = {style}  onClick = {(e) =>{setAddModalState(true)} }>
            {val.text }
            <span className= 'deleteBlock'>
              delete
            </span>
          </div>     
}
export const Action:FC<IAction> = ({val,setAddModalState,showModalChange} ) => {
    return <div className = "actions" onClick = {showModalChange} data-id = {val.index}>
            <span className = 'text'> {val.text } </span>
            <span className = 'closeIcon'> <CloseOutlined  data-id = "SVG" onClick = {() => {alert('а вот и я неждали!')}}/> </span> 
        </div>
}
export const ActionHidden:FC<IAction> = ({val,setAddModalState,showModalChange} ) => {
    return <div className = "actions hiddenAction"  onClick = {showModalChange} data-id = {val.index}>
            <span className = 'text'> {val.text } </span>
            <span className = 'closeIcon'> <CloseOutlined  data-id = "SVG" onClick = {() => {alert('а вот и я неждали!')}}/> </span> 
          </div>
}



