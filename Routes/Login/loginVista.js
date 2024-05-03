/*
    Este archivo describe las acciones que se daran durante el login 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();


// Ruta de renderizado de la vista 
router.get('/', (req, res) => {
    // Optiene el valor de la sesion que viene del server
    var avisoLogin = req.session.avisoLogin;
    delete req.session.avisoLogin;

    // Obtiene el valor que viene de otra vista
    var aviso = req.session.aviso;
    delete req.session.aviso;

    res.render('login', { tituloPagina: 'Iniciar sesión', aviso: aviso, avisoLogin: avisoLogin});
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.