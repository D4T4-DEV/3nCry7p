const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

async function authenticate(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    console.log("Token " + token)

    // Si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/iniciar-sesion');
    }
    
    try {
        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Almacena el ID del usuario en la solicitud para su posterior uso
        req.userId = decoded.userId;
        next();
    } catch (err) {
        // Si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/iniciar-sesion');
    }
}

// Generar un toquen con JTW
function generateToken(userId) {
    // Crea un token con el ID de usuario y una clave secreta
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
}

module.exports = {
    authenticate,
    generateToken
}