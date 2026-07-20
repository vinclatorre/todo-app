import { useState } from "react";
import { login } from "../services/api";

function Login({onLogin}){
    //stato che contiene email e password
    const [form, setForm] = useState({
            email: '',
            password: ''
        })

    //aggiorna lo stato del form con email e password inseriti dall'utente, viene chiamata quando si modifica l'input
    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    //chiama la funzione login presente nell'api e salva la risposta in result, viene chiamata quando si clicca sil button
    //i dati vengono salvati anche nel database
    async function handleLogin(){
        const result = await login(form.email, form.password);
        if (result.token) {             //se il token è valido lo passa a onLogin che viene data in  
            onLogin(result.token);      //App.js che lo salva nello stato con setToken
        }
    }

    return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Login</h2>
                        <div className="mb-3">
                            <input 
                                type="email" 
                                name="email" 
                                value={form.email} 
                                onChange={handleChange} 
                                placeholder="Email"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                name="password" 
                                value={form.password} 
                                onChange={handleChange} 
                                placeholder="Password"
                                className="form-control"
                            />
                        </div>
                        <button onClick={handleLogin} className="btn btn-primary w-100">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default Login;