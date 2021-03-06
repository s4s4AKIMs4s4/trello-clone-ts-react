import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import {allActionCreators} from '../store/reducers/index'

export function UseActions(){
    const dispatch = useDispatch()
    return bindActionCreators(allActionCreators, dispatch) 
}