import { useState } from "react";
import ToDoList from "./components/TodoList";
import Register from "./components/Register";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [token,setToken] = useState(null);

  if (token) {
    return (
    <div >
      <ToDoList token={token} onLogout={()=> setToken(null)}/>
    </div>
  );
  }
  else {
    return (
    <div>
      {showLogin
        ? <Login onLogin={(token)=>setToken(token) }/>
        : <Register/>
      }
      <div className="text-center mt-3">
        {showLogin
          ? <p>Non hai un account?<span className="text-primary" style={{cursor: 'pointer'}} onClick={()=> setShowLogin(false)}> Register</span></p>
          : <p>Hai già un account?<span className="text-primary" style={{cursor: 'pointer'}} onClick={()=> setShowLogin(true)}> Login</span></p>
        }
      </div>
    </div>
    )
  }
}

export default App;
