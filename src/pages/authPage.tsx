import { useTypedSelector } from "../hooks/typedSelector";
import Login from "../components/Login";
import App from "../components/Mediator";

function AuthPage() {
    const auth  = useTypedSelector( state => state.googleAuth )
    
    return <div className ="containerAuthPage">
            {
            (localStorage.getItem('userEmail'))
            ?<><div className="typing-demo hiddenT" >
                welcome to the React Board.
            </div>
            <Login type = {false}/>
            </>
            :<><div className="typing-demo">
                    welcome to the React Board.
                </div>
            <Login type = {true}/>
        </>   
            }
           
    </div>
}

export default AuthPage
