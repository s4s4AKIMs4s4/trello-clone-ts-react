import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import {AppDispatch} from '../store/index'
import {BlockActionCreators} from '../store/reducers/block/actions'


export function UseActions(){
    const dispatch = useDispatch() // also simple useDispatch()
    return bindActionCreators(BlockActionCreators, dispatch) 
}