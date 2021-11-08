import { useTypedSelector } from "../hooks/typedSelector";
import Login from "./Login";
import App from "./Mediator";

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
