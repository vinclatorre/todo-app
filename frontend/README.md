# Todo App

Una applicazione web per la gestione di una lista di cose da fare, con autenticazione degli utenti.

## 🔗 Link

- **Frontend**: https://todo-app-a1234.vercel.app
- **Backend API**: https://todo-app-h7zx.onrender.com
- **Documentazione API**: https://todo-app-h7zx.onrender.com/api-docs

## 🛠️ Tecnologie utilizzate

**Frontend**
- React
- Bootstrap

**Backend**
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Swagger

## 📁 Struttura del progetto
todo-app/
├── backend/
│   ├── server.js
│   ├── models/
│   │   ├── todo.js
│   │   └── user.js
│   ├── routes/
│   │   ├── todos.js
│   │   └── auth.js
│   └── middleware/
│       └── authMiddleware.js
└── frontend/
└── src/
├── App.js
├── components/
│   ├── TodoList.js
│   ├── TodoItem.js
│   ├── AddTodo.js
│   ├── Login.js
│   └── Register.js
└── services/
└── api.js

## 🚀 Come avviare il progetto in locale

### Backend
```bash
cd backend
npm install
node server.js
```

Crea un file `.env` nella cartella `backend`:
MONGODB_URI=connectionString
JWT_SECRET=secretString
PORT=3000

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📡 API Endpoints

### Autenticazione
| Metodo | Route | Descrizione |
|--------|-------|-------------|
| POST | /auth/register | Registra un nuovo utente |
| POST | /auth/login | Effettua il login |

### Todo
| Metodo | Route | Descrizione |
|--------|-------|-------------|
| GET | /todos | Restituisce tutti i todo dell'utente |
| POST | /todos | Crea un nuovo todo |
| PUT | /todos/:id | Aggiorna un todo |
| DELETE | /todos/:id | Elimina un todo |

> Le route dei todo richiedono autenticazione tramite token JWT nell'header `Authorization: Bearer <token>`