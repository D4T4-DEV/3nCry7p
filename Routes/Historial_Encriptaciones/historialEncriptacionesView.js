/*
    Este archivo describe las acciones que se daran durante el historial de encriptaciones 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();
const {authenticateRequiered} = require('../../Models/autenticacion/autenticacion');

// Ruta de renderizado para el historial de encriptaciones 
router.get('/', authenticateRequiered, async (req, res) => {

    res.render('historialEncriptacion', {});
});

module.exports = router;
// Esta es una sección importante que necesita ser completada.