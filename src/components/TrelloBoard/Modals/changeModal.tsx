import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { FC, useState } from 'react';
import { UseActions } from '../../../hooks/useActionsHook';
import { Istate } from '../../../data/board';
import FireBase from '../../../abstractions/http/FirebaseApi';
import { useTypedSelector } from '../../../hooks/typedSelector';

interface IChangeModal{
    idAction: string | null,
    idBlock: string | null,
    isModalVisibleChange: boolean,
    changeModalSate: (value: boolean) => void,
    state:Istate[],
    userId:string | null,   
}



export const ChangeModal:FC<IChangeModal> = ({state, idAction, idBlock, isModalVisibleChange, changeModalSate,userId }) => {
    const [headerChange, setHeaderChange] = useState<string>('')
    const auth  = useTypedSelector( state => state.googleAuth )
    const {UpdateActionHeader} = UseActions()
  
    const handleOkChange = () => {
        UpdateActionHeader(state, idBlock, idAction, headerChange,userId,auth)
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
        <Modal title="Change Action" visible={isModalVisibleChange} onOk={handleOkChange} onCancel={handleCancelChange}>
            <Input placeholder="" value = {headerChange} onChange = {handleInputChange}/>
        </Modal>
    )
} 