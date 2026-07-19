/**
 Questo è il file principale del backend
*/

// import
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//rende disponibili le variabili d'ambiente che si trovano nel file env
require('dotenv').config();

//crea l'applicazione express e definisce la porta su cui il server ascolta
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware globali
app.use(cors());            //serve per impedire al browser di bloccare le richieste del frontend
app.use(express.json());    //permette al backend di leggere le richieste in formato json

//configurazione swagger
const swaggerOptions = {
    definition: {
        openapi : '3.0.0',
        info : {
            title: 'Todo API',
            version : '1.0.0',
            desctiption: 'API per la gestione di una todolist con autenticazione'
        },
    },
    apis: ['./routes/*.js'],
    components : {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                schema: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    }
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);                       //converte i commenti in una documentazione json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));    //crea la pagina dove è possibile testare le api

//Connessione a mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connesso a MongoDB'))
.catch((err) => console.log('Errore di connessione:', err));

//Route
app.use('/todos', require('./routes/todos'));
app.use('/auth', require('./routes/auth'));

//Listen
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})