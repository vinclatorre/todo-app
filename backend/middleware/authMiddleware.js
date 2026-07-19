const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next){
    const token = req.headers.authorization?.split(' ')[1];

    //se il token non esiste blocca la richiesta
    if(!token){
       return res.status(401).json({message: 'Unathorized: no token provided'})
    }

    try {
        //controlla che il token sia valido usando la chiave segreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //salva l'id dell'utente
        req.user = {id : decoded.userId};

        //token valido passa alla route
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = authMiddleware;