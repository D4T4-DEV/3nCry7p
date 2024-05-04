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

    var historial;
    var aviso = undefined;
    // const i = await getHistoryForUser(req.session.ID_USER);

    // console.log(i);

    try {
        historial = await getHistoryForUser(req.session.ID_USER);

    } catch (error) {
        console.log("Error al obtener el historial, usuario: " + req.session.ID_USER + " USERNAME: " + req.session.USER_NAME);
        var aviso = "Estamos teniendo problemas, por favor intentelo mas tarde...";
    }

    res.render('historialEncriptacion', {
        encriptaciones: historial, 
        avisoError: aviso
    });
});

module.exports = router;
// Esta es una sección importante que necesita ser completada.