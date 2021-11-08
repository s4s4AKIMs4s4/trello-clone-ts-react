import {GoogleLogin} from 'react-google-login'
import { useTypedSelector } from '../hooks/typedSelector'
import { UseActions } from '../hooks/useActionsHook'
import { refreshTokenSetup } from '../utils/refreshToken'


const clientId = '1063570108565-7ss78t1ivsudrkk6vnqhlr3c13g9tfnk.apps.googleusercontent.com'
function Login() {
    const {SetUserEmail} = UseActions()
    const auth  = useTypedSelector( state => state.googleAuth )

    const onSuccess = (res: any) =>{
        refreshTokenSetup(res)
        SetUserEmail(res.profileObj.email)
        console.log(auth.userEmail)
    }
    const onFailure = (res:any) => {
        console.log('fail')
    }

    return (
        <div>
            <GoogleLogin
                clientId = {clientId}
                buttonText = "Login"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                style = {{marginTop:'100px'}}
                isSignedIn = {true}
            />
        </div>

    )

}

export default Login