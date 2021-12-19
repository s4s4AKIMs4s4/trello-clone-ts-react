import { useState } from "react";
import Login from "../components/Login";

function AuthPage() {   
    const [isTyping, SetIsTyping] = useState<boolean>(false) 
    const setTimer = () => {
        setTimeout(() => {
            SetIsTyping(true)
        }, 2500)
    }
    return <div className ="containerAuthPage">
            {
            (localStorage.getItem('userEmail'))
            ?<>
                <div className="typing hiddenText" >
                    welcome to the React Board.
                </div>
                <Login type = {false}/>
            </>
            :<>
                {!isTyping
                    ?  setTimer()
                    : <div className="typing">
                            welcome to the React Board.
                        </div>                       
                }
                <Login type = {true}/>
                
            </>   
            }
           
    </div>
}

export default AuthPage
