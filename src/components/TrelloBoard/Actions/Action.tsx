import React, { FC } from "react";
import { children } from "../../../data/board";
import { CloseOutlined } from '@ant-design/icons'

interface IAction{
    val:children,
    showModalChange:() => void,
}

const Action:FC<IAction> = ({val,showModalChange} ) => {
    return <div className = "actions" onClick = {showModalChange} data-id = {val.index}>
            <span className = 'text'> {val.text } </span>
            <span className = 'closeIcon'> <CloseOutlined  data-id = "SVG"/> </span> 
        </div>
}


export default React.memo(Action)