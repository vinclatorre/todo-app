//importo useState, bootstrap, css e i vari componenti

import { useState } from "react";
import ToDoList from "./components/TodoList";
import Register from "./components/Register";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//funzione principale del frontend che renderizza tutti i componenti
function App() {
  const [showLogin, setShowLogin] = useState(true); //mostra il login nel caso sia true altrimenti mostra register
  const [token,setToken] = useState(null);

    //se il token è valido viene mostrata la todolist
  if (token) {
    return (
    <div >
      <ToDoList token={token} onLogout={()=> setToken(null)}/>
    </div>
  );
  }

  //altrimenti viene mostrata la schermata di login o registrazione
  else {
    return (

      //i componenti di registrazione e login vengono mostrati uno per volta in base al valore di showLogin
    <div>
      {showLogin
        ? <Login onLogin={(token)=>setToken(token) }/>
        : <Register/>
      }

      {/* permette all'utente di scegliere se fare il login o la registrazione */}
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
