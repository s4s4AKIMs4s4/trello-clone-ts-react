import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { FC, useState } from 'react';
import { UseActions } from '../../../hooks/useActionsHook';
import { Istate } from '../../../data/board';
import FireBase from '../../../abstractions/http/FirebaseApi';
import { useTypedSelector } from '../../../hooks/typedSelector';

interface IAddModal{
    isModalVisibleChange: boolean,
    setModalSate: (value: boolean) => void,
    state:Istate[],   
    userId:string| null
}



export const AddBlockModal:FC<IAddModal> = ({state, isModalVisibleChange, setModalSate,userId }) => {
    const [headerAdd, setHeaderAdd ] = useState<string>('')
    const {addBlock} = UseActions()
    const auth  = useTypedSelector( state => state.googleAuth )

    const handleOkChange = () => {
        addBlock(state,headerAdd)
        setHeaderAdd('')
        setModalSate(false)
        if(userId !== ''){
            FireBase.sendData(auth,state,userId).then(() => console.log('ok') )
        }
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