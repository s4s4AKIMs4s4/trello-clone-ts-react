import Login from "../components/Login";

function AuthPage() {    
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
