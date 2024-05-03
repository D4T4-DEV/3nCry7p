const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

async function authenticate(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    var pruebasRestantes = req.session.pruebasRestantes;

    console.log(pruebasRestantes);
    console.log("Token " + token)

    if(pruebasRestantes > 2){
        return res.redirect('/iniciar-sesion');
    }

    if (req.isAuthenticated()) {
        
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.log('La sesión ha caducado.');

                return res.redirect('/iniciar-sesion');
            } else {
                console.error('Error al verificar el token:', error);
                return res.redirect('/iniciar-sesion');
            }
        }
    }
    // try {
    //     // Verifica el token usando la clave secreta
    //     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //     // Almacena el ID del usuario en la solicitud para su posterior uso
    //     req.userId = decoded.userId;
    //     next();
    // } catch (err) {
    //     // Si hay un error en la verificación del token, redirige al usuario al login
    //     return res.redirect('/iniciar-sesion');
    // }

    next();
}

// Generar un toquen con JTW
function generateToken(userId) {
    // Crea un token con el ID de usuario y una clave secreta
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10' });
}

module.exports = {
    authenticate,
    generateToken
}