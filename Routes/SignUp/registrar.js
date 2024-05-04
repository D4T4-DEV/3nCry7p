const express = require('express');
const router = express.Router();

// Medios propios
const accionesUsuarioDB = require('../../Database/Acciones_DB/Usuarios/usuariosDB');
const methodEncript = require('../../Models/Cifrado_PWD_Usuario/pwd_hash_method');

router.post('/', async (req, res) => {

    const { usuario, correo, contrasenia, confirmPassword } = req.body; // Obtiene el valor de los formularios
    const emailRegex = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/; // REGEX para comparar el correo

    // Acciones que valida
    // Verifica el CORREO
    if (!emailRegex.test(correo)) {
        req.session.avisoSignUp = 'El correo ingresado no es valido :('; // Mensaje tomado 
        return res.redirect('/registrarse');
    }

    // Verifica la contraseña
    if (contrasenia !== confirmPassword) {
        req.session.avisoSignUp = 'Las contraseñas no coinciden :('; // Mensaje tomado 
        return res.redirect('/registrarse');
    }

    // Acciones que toma si es correcto
    try {
        // Verifica que no exista un usuario con ese nombre
        if (await accionesUsuarioDB.getUserForUserName(usuario)) {
            req.session.avisoSignUp  = 'NO USES ESTE USUARIO, le pertenece a alguien más (👉ﾟヮﾟ)👉'; // Mensaje tomado 
            return res.redirect('/registrarse');
        }
        await accionesUsuarioDB.registrarUsuario(usuario, correo, await methodEncript.generateHashForAnything(contrasenia));
        req.session.avisoLoginSignUp = 'Registrado correctamente 🥹👻'; // Mensaje tomado 
        return res.redirect('/iniciar-sesion');
    } catch (error) {
        req.session.avisoSignUp  = 'Estamos teniendo problemas, por favor intenta más tarde'; // Mensaje tomado 
        return res.redirect('/registrarse');
    }
});

module.exports = router;