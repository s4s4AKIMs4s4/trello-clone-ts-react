import { useTypedSelector } from "../hooks/typedSelector";
import Login from "../components/Login";
import App from "../components/Mediator";

function AuthPage() {
    const auth  = useTypedSelector( state => state.googleAuth )
    return <div>
        {
            (auth.userEmail !== '')
                ? <App/>
                : <Login/>   
        }   
    </div>
}

export default AuthPage
