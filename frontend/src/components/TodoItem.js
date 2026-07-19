function ToDoItem({todo, onUpdate, onDelete}){
    return (
        <div className="container mt-3">
            <div className="d-flex align-items-center mb-2">
                <input 
                className="form-check-input me-2"
                checked={todo.completed} 
                type="checkbox" 
                onChange={()=> onUpdate(todo._id, !todo.completed)}/>

                <label 
                className="form-check-label me-auto"
                htmlFor={todo._id}>{todo.task}</label>
                <button 
                className="btn btn-danger btn-sm"
                onClick={()=> onDelete(todo._id)}>Delete</button>
            </div>
        </div>
    )
}

export default ToDoItem;