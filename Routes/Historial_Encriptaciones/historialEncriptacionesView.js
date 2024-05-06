/*
    Este archivo describe las acciones que se daran durante el historial de encriptaciones 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();
const {authenticateRequiered} = require('../../Models/autenticacion/autenticacion');

// Acciones de la bd
const {getHistoryForUser} = require('../../Database/Acciones_DB/historial_de_Encriptaciones/historialEncriptaciones');

// Ruta de renderizado para el historial de encriptaciones 
router.get('/', authenticateRequiered, async (req, res) => {

    try {
        var historial = await getHistoryForUser(req.session.ID_USER);
        res.render('historialEncriptacion', {
            encriptaciones: historial != undefined ? historial : 0
        });

    } catch (error) {
        console.log("Error al obtener el historial, usuario: " + req.session.ID_USER + " USERNAME: " + req.session.USER_NAME);
        req.session.aviso = "Estamos teniendo problemas, por favor intentelo mas tarde...";
        res.redirect('/')
    }

});

module.exports = router;
// Esta es una sección importante que necesita ser completada.