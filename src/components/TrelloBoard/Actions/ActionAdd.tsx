import React, { FC } from "react";
import { children } from "../../../data/board";
import { CloseOutlined } from '@ant-design/icons'

interface IActionAdd{
    val:children,
    setAddModalState:(value:boolean) => void,
}
const ActionAdd:FC<IActionAdd> = ({val,setAddModalState} ) => {
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


export default React.memo(ActionAdd)

