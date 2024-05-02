/*
    Este archivo describe las acciones que se daran durante el registro 
    y como se mostrará en cuestión.
*/
const express = require('express');
const router = express.Router();


// Ruta de renderizado de la vista 
router.get('/', (req, res) => {

    var aviso = req.session.aviso;
    delete req.session.aviso;

    res.render('signup', { title: 'Registrate', aviso: aviso});
});

module.exports = router;
// Esta es una sección importante que necesita ser completada.