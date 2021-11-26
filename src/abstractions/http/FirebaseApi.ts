import axios from "axios"
import {initialState} from '../../store/reducers/block/index'
import { IState } from "../../store/reducers/block/types"
import {Istate as GoogleState} from '../../store/reducers/googleAuth/types'

class FireBase{
    static firebaseApi = process.env.REACT_APP_TRELLO_PROJECT_ID as string
    static getUsers(){
        return axios.get(FireBase.firebaseApi+'/notes.json')   
    }

    static initNewUser(auth:GoogleState){
        const firebaseInit = {
            email:[auth.userEmail],
            initialState
        }
        return axios.post(FireBase.firebaseApi+'/notes.json', JSON.stringify(firebaseInit))
    }

    static sendData(auth:GoogleState, state: IState[], fireKey: string){
        const DataToSend = {
            email:[auth.userEmail],
            initialState:state
        }
        return axios.patch(FireBase.firebaseApi + `/notes/${fireKey}.json`,JSON.stringify(DataToSend))
    }

}
export default FireBase