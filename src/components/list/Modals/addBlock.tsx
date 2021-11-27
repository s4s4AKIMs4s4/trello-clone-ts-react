import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { FC, useState } from 'react';
import { UseActions } from '../../../hooks/useActionsHook';
import { Istate } from '../../../data/board';

interface IAddModal{
    isModalVisibleChange: boolean,
    setModalSate: (value: boolean) => void,
    state:Istate[],   
}



export const AddBlockModal:FC<IAddModal> = ({state, isModalVisibleChange, setModalSate }) => {
    const [headerAdd, setHeaderAdd ] = useState<string>('')
    const {addBlock} = UseActions()
  
    const handleOkChange = () => {
        addBlock(state,headerAdd)
        setHeaderAdd('')
        setModalSate(false)
    }
    
    const handleCancelChange = () => {
        setModalSate(false)
    }
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setHeaderAdd(e.target.value)
    }
    
    return (
        <>
        
        <Modal title="Add Block" visible={isModalVisibleChange} onOk={handleOkChange} onCancel={handleCancelChange}>
            
            <Input placeholder="" value = {headerAdd} onChange = {handleInputChange}/>
        </Modal>
        </>
    )
} 