import React,{ FC } from "react";
import {Istate} from '../../data/board'

interface IHidden{
    val: Istate,
    destribution:(e: React.MouseEvent<HTMLDivElement> ) => void,
}
const HiddenBlcok:FC<IHidden> = ({val, destribution}) =>{
    return <div className="block hidden"  onMouseDown = {destribution} > 
    {val.header}
  </div>
}

export const MemoHiddenBlock = React.memo(HiddenBlcok)

