import { useState } from "react";
import { register } from "../services/api";

function Register (){
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    // handleChange serve per gestire gli eventi
    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function handleRegister(){
        const result = await register(form.username, form.email, form.password);
        console.log(result);
    }

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Register</h2>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={form.username} 
                                    onChange={handleChange} 
                                    placeholder="Username"
                                    className="form-control"
                                />
                            </div>
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
                            <button onClick={handleRegister} className="btn btn-primary w-100">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
