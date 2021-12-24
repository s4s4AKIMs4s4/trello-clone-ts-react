import {GoogleLogout} from 'react-google-login'

function Logout() {
    const onSuccess = () =>{
        console.log('logout made successfully')
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