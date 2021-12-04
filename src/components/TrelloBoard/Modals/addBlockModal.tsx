import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { FC, useState } from 'react';
import { UseActions } from '../../../hooks/useActionsHook';
import { Istate } from '../../../data/board';
import { useTypedSelector } from '../../../hooks/typedSelector';

interface IChangeModal{
    idAction: string | null,
    idBlock: string | null,
    isModalVisibleChange: boolean,
    setModalSate: (value: boolean) => void,
    state:Istate[],
    userId: string| null,   
}



export const AddActionModal:FC<IChangeModal> = ({state, idAction, idBlock, isModalVisibleChange, setModalSate,userId }) => {
    const [headerAdd, setHeaderAdd ] = useState<string>('')
    const {AddAction} = UseActions()
    const auth  = useTypedSelector( state => state.googleAuth )

    const handleOkChange = () => {
        AddAction(state, idBlock, headerAdd,userId,auth)
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
        <Modal title="Add Action" visible={isModalVisibleChange} onOk={handleOkChange} onCancel={handleCancelChange}>
            <Input placeholder="" value = {headerAdd} onChange = {handleInputChange}/>
        </Modal>
        </>
    )
} 