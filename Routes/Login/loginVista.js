/*
    Este archivo describe las acciones que se daran durante el login 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();


// Ruta de renderizado de la vista 
router.get('/', (req, res) => {
    const aviso = req.session.aviso; // tomamos la variable de aviso de la sesion
    delete req.session.aviso; // Eliminamos la variable de la sesion
    res.render('login', { tituloPagina: 'Iniciar sesión', aviso: aviso });
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.