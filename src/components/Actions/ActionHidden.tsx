import React,{ FC } from "react";
import { children } from "../../data/board";
import { CloseOutlined } from '@ant-design/icons'

interface IAction{
    val:children,
    setAddModalState:(value:boolean) => void,
    showModalChange:() => void,
}

const ActionHidden:FC<IAction> = ({val,setAddModalState,showModalChange} ) => {
    return <div className = "actions hiddenAction"  onClick = {showModalChange} data-id = {val.index}>
            <span className = 'text'> {val.text } </span>
            <span className = 'closeIcon'> <CloseOutlined  data-id = "SVG" onClick = {() => {console.log('f');alert('а вот и я неждали!')}}/> </span> 
          </div>
}

export default React.memo(ActionHidden)