import {GoogleLogout} from 'react-google-login'
//const clientId = '1063570108565-7ss78t1ivsudrkk6vnqhlr3c13g9tfnk.apps.googleusercontent.com'

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