import { useEffect, useState } from "react";
import { getTodos, updateTodo, deleteTodo, createTodo } from "../services/api";
import ToDoItem from "./TodoItem";
import AddTodo from "./AddTodo";

function ToDoList({token, onLogout}){
    const [todos, setTodos] = useState([]);

    //esegue il codice dopo che il componente viene renderizzato
    useEffect(() => {
    async function caricaTodos() {                  //carica i todo appena l'utente fa il login
        const data = await getTodos(token);         //fa una get per ottenere la lista
        setTodos(data || []);                       //aggiorna lo stato
    }
    caricaTodos();
}, [token]);

    // queste funzioni vengono passate come props a todoItem
    async function handleUpdate(id, completed){
        await updateTodo(id, completed, token);     //chiama updateTodo per aggiornare il todo nel database
        const data = await getTodos(token);         //fa una get per ottenere la lista aggiornata
        setTodos(data || []);                       //aggiorna lo stato
    }

    async function handleDelete(id) {
        await deleteTodo(id, token);                // chiama deleteTodo per eliminare il todo dal database
        const data = await getTodos(token);         //fa una get per ottenere la lista aggiornata
        setTodos(data || []);                       //aggiorna lo stato
    }

    async function handleAdd(task) {
        await createTodo(task, token);              // chiama createTodo dell'api per aggiungere il todo al database
        const data = await getTodos(token);         //fa una get per ottenere la lista aggiornata
        setTodos(data || []);                       //aggiorna lo stato
    }
    
    //restituisce titolo e l'elenco contenente dei todo prensenti nello stato
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