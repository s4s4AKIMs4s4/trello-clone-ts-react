import block from './block'
import event from './event'
import {BlockActionCreators} from './block/actions'
import {AllEventActionCreators} from './event/actions'


export default {
    block,
    event
}

export const allActionCreators = {
    ...BlockActionCreators,
    ...AllEventActionCreators
}