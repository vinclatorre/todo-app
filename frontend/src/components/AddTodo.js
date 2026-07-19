import { useState } from "react";


function AddTodo({onAdd}){
    const [task, setTask] = useState('')

    // crea la task e svuota l'input precedente
    function handleAdd(){
    onAdd(task);
    setTask('');
    }

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input 
                            type='text' 
                            className="form-control rounded-pill rounded-end"
                            value={task}
                            placeholder="Aggiungi"
                            onChange={(e) => setTask(e.target.value)}/>
                        <button 
                            className="btn btn-primary rounded-pill rounded-start ms-2"
                            onClick={handleAdd}> Aggiungi
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        

    
        
)
}

export default AddTodo;
