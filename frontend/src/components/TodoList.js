import { useEffect, useState } from "react";
import { getTodos, updateTodo, deleteTodo, createTodo } from "../services/api";
import ToDoItem from "./TodoItem";
import AddTodo from "./AddTodo";

function ToDoList({token, onLogout}){
    const [todos, setTodos] = useState([]);

    async function caricaTodos() {
        const data = await getTodos(token);
        setTodos(data || []);
    }

    useEffect(()=>{
        caricaTodos();
    }, [])

    async function handleUpdate(id, completed){
        await updateTodo(id, completed, token);
        caricaTodos();
    }

    async function handleDelete(id) {
        await deleteTodo(id, token);
        caricaTodos();
    }

    async function handleAdd(task) {
        await createTodo(task, token);
        caricaTodos();
    }
    
    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div style={{width: '80px'}}></div>
                <h1 className="text-center mb-0">Todo List</h1>
                <button className="btn btn-outline-danger " onClick={onLogout}>Logout</button>
            </div>
            
            <div className="card">
            {todos.length === 0 
                    ? <p className="text-muted text-center">Nessun todo aggiunto!</p>
                    : todos.map((todo) => (
                        <ToDoItem key={todo._id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete}/>
                    ))
                }
            </div>
            <div className="mt-3">
                <AddTodo onAdd={handleAdd}/>
            </div>
        </div>
    );
}

export default ToDoList;