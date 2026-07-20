// questo file contiene le funzioin per far comunicare il frontend con il backend tramite fetch
// fetch serve a fare chiamate http, restituisce una promise, è l'equivalente di thunder client nel codice

const API_URL = 'https://todo-app-h7zx.onrender.com/todos';     // URL da usare nelle chiamate fetch
const AUTH_URL = 'https://todo-app-h7zx.onrender.com/auth';

export async function getTodos(token){
    const response = await fetch(API_URL, {
        headers: {'Authorization' : `Bearer ${token}`}
    });                                     //di default fa una chiamata GET quindi non serve spicificarlo in method
    return response.json();                 // converte la risposta in json
}

export async function createTodo(task,token) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Authorization' : `Bearer ${token}`,'Content-Type' : 'application/json'},
        body : JSON.stringify({task})
    });
    return response.json();
}

export async function updateTodo(id, completed,token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {'Authorization' : `Bearer ${token}`,'Content-Type': 'application/json'},
        body: JSON.stringify({completed})
    });
    return response.json();
}

export async function deleteTodo(id,token) {
    await fetch(`${API_URL}/${id}`, {
        headers: {'Authorization' : `Bearer ${token}`},
        method: 'DELETE'
    });
}

export async function register(username, email, password) {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  return response.json();
}

export async function login(email, password) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
}