import {AuthActionEnum,SetUserEmail} from './types'
export const AuthActionCreators = {
   SetUserEmail:(userEmail: string): SetUserEmail  => {
        return {
            type:AuthActionEnum.SET_EMAIL,
            payload: userEmail,
        }
    }
    
}