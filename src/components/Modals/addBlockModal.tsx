import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { FC, useState } from 'react';
import { UseActions } from '../../hooks/useActionsHook';
import { Istate } from '../../App';

interface IChangeModal{
    idAction: string | null,
    idBlock: string | null,
    isModalVisibleChange: boolean,
    setModalSate: (value: boolean) => void,
    state:Istate[],   
}



export const AddActionModal:FC<IChangeModal> = ({state, idAction, idBlock, isModalVisibleChange, setModalSate, }) => {
    const [headerAdd, setHeaderAdd ] = useState<string>('')
    const {AddAction} = UseActions()
  
    const handleOkChange = () => {
        AddAction(state, idBlock, headerAdd)
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
        <h1>ss</h1>
        <Modal title="Basic Modal" visible={isModalVisibleChange} onOk={handleOkChange} onCancel={handleCancelChange}>
            <p>idAction - {idAction} </p>
            <p>id block - {idBlock}</p>
            <p>add new header</p>
            <Input placeholder="description" value = {headerAdd} onChange = {handleInputChange}/>
        </Modal>
        </>
    )
} 