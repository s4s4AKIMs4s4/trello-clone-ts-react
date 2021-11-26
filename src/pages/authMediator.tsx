import { useTypedSelector } from "../hooks/typedSelector";
import App from "../components/Mediator";
import AuthPage from "./authPage";
function AuthPagMediator() {
    const auth  = useTypedSelector( state => state.googleAuth )
    return <div>
                { 
                (auth.userEmail)
                    ?  <App/> 
                    : <AuthPage/>   
                }   
            </div>
}

export default AuthPagMediator
