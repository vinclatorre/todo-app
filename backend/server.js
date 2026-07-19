/**
 Questo è il file principale del backend
 */
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware globali
app.use(cors());
app.use(express.json());

//swagger

//configurazione
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