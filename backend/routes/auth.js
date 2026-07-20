/**
 questo file contiene le routes per login e register
*/

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuovo utente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utente registrato con successo
 *       400:
 *         description: Username o email già utilizzati
 *       500:
 *         description: Errore del server
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Effettua il login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *       401:
 *         description: Email o password non validi
 *       500:
 *         description: Errore del server
 */
router.post('/login', login)

async function register(req, res){
    try {

    //prende username email e password dal body
    const {username, email, password} = req.body;   
    
    //controlla se esiste un utente con lo stesso nome
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    //restituisce un errore se esiste un utente con lo stesso nome
    if (existingUser) {
        return res.status(400).json({message : 'username already used'})
    }

    //password criptata, 10 è il numero di salt round
    const hashedPassword = await bcrypt.hash(password, 10)

    //crea un nuovo user
    const newUser = new User({username, email, password: hashedPassword})

    //lo salva nel database
    await newUser.save();

    //return 201
    return res.status(201).json({
        message: 'User successfully registered',
        user: {
            id : newUser._id,
            username: newUser.username,
            email : newUser.email
        }
    });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error registering user', error})
    }
}

async function login(req, res){
    try {
        //prende username email e password dal body
        const {username, email, password} = req.body;

        //cerca l'utente con l'email a cui si vuole fare il login
        const foundUser = await User.findOne({email});

        //se l'user non esiste invia un errore
        if (!foundUser) {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        
        // se la password non corrisponde invia un errore
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // crea il token
        const token = jwt.sign({userId: foundUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' })

        //restituisce status(200) se il login è stato effettuato
        res.status(200).json({
            token,
            user: {
                id: User._id,
                username: foundUser.username,
                email: foundUser.email,
            }
        });
    } catch (error) {
        res.status(500).json({message: 'error logging user', error})
    }
}

module.exports = router;