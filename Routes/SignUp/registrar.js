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
            req.session.aviso = 'El correo ingresado no es valido :('; // Mensaje tomado 
            return res.redirect('/registrarse');
        }
        
        // Verifica la contraseña
        if (contrasenia !== confirmPassword) {
            req.session.aviso = 'Las contraseñas no coinciden :('; // Mensaje tomado 
            return res.redirect('/registrarse');
        }

    // Acciones que toma si es correcto
    try {
        await accionesUsuarioDB.registrarUsuario(usuario, correo, await methodEncript.generateHashForAnything(contrasenia));
        req.session.aviso = 'Registrado correctamente 🥹👻'; // Mensaje tomado 
        return res.redirect('/iniciar-sesion');
    } catch (error) {
        req.session.aviso = 'Estamos teniendo problemas, por favor intenta más tarde'; // Mensaje tomado 
        return res.redirect('/registrarse');
    }

});

module.exports = router;