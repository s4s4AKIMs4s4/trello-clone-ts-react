import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { FC, useState } from 'react';
import { UseActions } from '../../../hooks/useActionsHook';
import { Istate } from '../../../data/board';

interface IChangeModal{
    idAction: string | null,
    idBlock: string | null,
    isModalVisibleChange: boolean,
    changeModalSate: (value: boolean) => void,
    state:Istate[],   
}



export const ChangeModal:FC<IChangeModal> = ({state, idAction, idBlock, isModalVisibleChange, changeModalSate, }) => {
    const [headerChange, setHeaderChange] = useState<string>('')
    const {UpdateActionHeader} = UseActions()
  
    const handleOkChange = () => {
        UpdateActionHeader(state, idBlock, idAction, headerChange)
        setHeaderChange('')
        changeModalSate(false)
    }
    
    const handleCancelChange = () => {
        changeModalSate(false)
    }
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setHeaderChange(e.target.value)
    }
    
    return (
        <Modal title="New Action" visible={isModalVisibleChange} onOk={handleOkChange} onCancel={handleCancelChange}>
            <Input placeholder="" value = {headerChange} onChange = {handleInputChange}/>
        </Modal>
    )
} 