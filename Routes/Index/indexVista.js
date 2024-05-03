/*
    Este archivo describe las acciones que se daran durante el index 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();
const {authenticate} = require("../../Models/autenticacion/autenticacion");

// Ruta de renderizado de la vista 
router.get('/', /*authenticate, async*/ (req, res) => {

    // Obtenemos
    var aviso = req.session.aviso;
    var texto_a_Encriptar = req.session.texto_a_Encriptar;
    var tamanioTexto = req.session.tamanioTexto;
    var textoEncriptado = req.session.textoEncriptado;

    res.render('index', { tituloPagina: 'Bienvenido! 👻💀', texto_a_Encriptar: texto_a_Encriptar, tamanioTexto: tamanioTexto, textoEncriptado: textoEncriptado, aviso: aviso});
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.