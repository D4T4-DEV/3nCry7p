const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

// Proteger un medio global dada la condicion de pruebas
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
            // Verificamos si el error lleva por nombre
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

// Proteger un medio especifico
async function authenticateRequiered(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const cookie = req.cookies.token;

    // Si no hay cookie, redirige al usuario al login

    if (!cookie) {
        req.session.avisoLoginSignUp = 'Inicia sesión para poder utilizar este medio... ;)';
        return res.redirect('/iniciar-sesion');
    }
    
    try {
        // Verifica el token usando la clave secreta
        jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (err) {
        req.session.avisoLoginSignUp = 'Es posible que haya expirado tu sesión, por seguridad vuelva a iniciar';
        return res.redirect('/iniciar-sesion');
    }
    //next(); // Permite ejecutar otro middleware o medio
}


// Generar un toquen con JTW
function generateToken(userId) {
    // Crea un token con el ID de usuario y una clave secreta
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1H' }); // expiresIn-> "segundos: 3600" "minutos: 60m" "Horas: 1h"
}

module.exports = {
    authenticateGlobal,
    generateToken,
    authenticateRequiered
}