import {GoogleLogout} from 'react-google-login'

function Logout() {
    const onSuccess = () =>{
        console.log('logout made successfully')
    }
    const onFailure = (res:any) => {
        console.log('fail')
    }
    return (
        <div>
            <GoogleLogout
                clientId = {process.env.REACT_APP_CLIENT_ID as string}
                buttonText = "Logout"
                onLogoutSuccess = {onSuccess}
            />
        </div>
    )
}

export default Logout