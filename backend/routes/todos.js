const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const authMiddleware = require('../middleware/authMiddleware');

// GET

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Restituisce tutti i todo dell'utente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista dei todo
 *       401:
 *         description: Non autorizzato
 */
router.get('/' ,authMiddleware, async (req,res)=> {
    try {
        const todos = await Todo.find({ userId: req.user.id }); // equivale a select * from todos
        res.json(todos); //restituisce il model todo
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// POST

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Crea un nuovo todo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo creato con successo
 *       401:
 *         description: Non autorizzato
 */
router.post('/',authMiddleware, async (req,res)=>{
    try{
        const todo = await Todo.create({ task: req.body.task, userId: req.user.id }); //crea un documento nel database con il valore task mandato dal client
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({error : err.message });
    }
});

//PUT

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Aggiorna un todo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo aggiornato con successo
 *       401:
 *         description: Non autorizzato
 */
router.put('/:id',authMiddleware, async (req, res)=> {
    try{
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,  //id del documento da trovare
            {completed: req.body.completed},    // campi da aggiornare
            {new: true}
        );
        res.json(todo); //manda al client il documento aggiornato
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// DELETE

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Elimina un todo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo eliminato con successo
 *       401:
 *         description: Non autorizzato
 */
router.delete('/:id',authMiddleware, async (req,res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo eleminato'});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;