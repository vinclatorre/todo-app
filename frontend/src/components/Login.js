import { useState } from "react";
import { login } from "../services/api";

function Login({onLogin}){
    const [form, setForm] = useState({
            email: '',
            password: ''
        })

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function handleLogin(){
        const result = await login(form.email, form.password);
        if (result.token) {
            onLogin(result.token);
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