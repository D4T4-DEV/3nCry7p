const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

async function authenticateGlobal(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    var pruebasRestantes = req.session.pruebasRestantes; // Obtenemos las pruebas restantes

    if (pruebasRestantes > 2) {
        req.session.avisoLoginSignUp = 'Inicia sesión para poder seguir encriptando...O.O';
        return res.redirect('/iniciar-sesion');
    }

    // tomamos si esta autenticado previamente 
    if (req.isAuthenticated()) {
        try {
            // Intentamos decifrar el codigo y si no puede lanzamos la excepcion
            // Aqui podemos ver tambien si la sesion ha expriado
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.log('La sesión ha caducado.');
                req.session.avisoLoginSignUp = 'La sesión ha caducado, inicia sesión de nueva cuenta 👻';
                return res.redirect('/iniciar-sesion');
            } else {
                req.session.avisoLoginSignUp = 'Estamos experimentando problemas, porfavor intentelo más tarde';
                console.error('Error al verificar el token:', error);
                return res.redirect('/iniciar-sesion');
            }
        }
    }
    next(); // Permite ejecutar otro middleware o medio
}

// Generar un toquen con JTW
function generateToken(userId) {
    // Crea un token con el ID de usuario y una clave secreta
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // expiresIn-> "segundos: 3600" "minutos: 60m" "Horas: 1h"
}

module.exports = {
    authenticateGlobal,
    generateToken
}