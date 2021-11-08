import {AuthActionEnum,SetUserEmail} from './types'
export const AuthActionCreators = {
   SetUserEmail:(userEmail: string): SetUserEmail  => {
       console.log(userEmail)
        return {
            type:AuthActionEnum.SET_EMAIL,
            payload: userEmail,
        }
    }
    
}