import block from './block'
import event from './event'
import googleAuth  from './googleAuth'
import {BlockActionCreators} from './block/actions'
import {AllEventActionCreators} from './event/actions'
import {AuthActionCreators} from './googleAuth/action'

export default {
    block,
    event,
    googleAuth
}

export const allActionCreators = {
    ...BlockActionCreators,
    ...AllEventActionCreators,
    ...AuthActionCreators,
}