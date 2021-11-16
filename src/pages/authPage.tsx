import { useTypedSelector } from "../hooks/typedSelector";
import Login from "../components/Login";
import App from "../components/Mediator";

function AuthPage() {
    const auth  = useTypedSelector( state => state.googleAuth )
    return <div className ="containerAuthPage">
         <div className="typing-demo">
         welcome to the React Board.
          </div>
         <Login/>   
           
    </div>
}

export default AuthPage
