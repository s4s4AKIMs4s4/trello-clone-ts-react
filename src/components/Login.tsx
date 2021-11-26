import {GoogleLogin} from 'react-google-login'
import { useTypedSelector } from '../hooks/typedSelector'
import { UseActions } from '../hooks/useActionsHook'
import { refreshTokenSetup } from '../utils/refreshToken'


//const clientId = '1063570108565-7ss78t1ivsudrkk6vnqhlr3c13g9tfnk.apps.googleusercontent.com'

interface props{
    type: boolean
}
function Login({type}:props) {
    const {SetUserEmail} = UseActions()
    const auth  = useTypedSelector( state => state.googleAuth )

    const onSuccess = (res: any) =>{
        try{
        refreshTokenSetup(res, res.profileObj.email)
        SetUserEmail(res.profileObj.email)
        localStorage.setItem('userEmail',res.profileObj.email)
        }
        catch(e:any){
            localStorage.removeItem('userEmail')
        }
    }
    const onFailure = (res:any) => {
        console.log('fail')
    }

    return (
        <div className = { (type)? `loginWrapper` : 'loginHidden'}>
            <GoogleLogin
                clientId = {process.env.REACT_APP_CLIENT_ID as string}
                buttonText = "Login with Google"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                style = {{marginTop:'100px'}}
                isSignedIn = {true}
                className ='loginButtom'
            />
        </div>

    )

}

export default Login