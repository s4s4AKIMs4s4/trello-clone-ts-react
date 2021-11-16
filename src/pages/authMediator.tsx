import { useTypedSelector } from "../hooks/typedSelector";
import Login from "../components/Login";
import App from "../components/Mediator";
import AuthPage from "./authPage";
function AuthPagMediator() {
    const auth  = useTypedSelector( state => state.googleAuth )
    function f(){
        
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        const a = localStorage.getItem('userEmail')
        console.log(a)
        return a 
    }
    return <div>

        { 
            
            (auth.userEmail)
                ?  <App/> 
                : <AuthPage/>   
        }   
    </div>
}

export default AuthPagMediator
