/*
    Este archivo describe las acciones que se daran durante el index 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();

// Ruta de renderizado de la vista 
router.get('/', async (req, res) => {
    var mensjeInicio;

    // Obtenemos
    var pruebas = req.session.pruebasRestantes;
    var aviso = req.session.aviso;
    var texto_a_Encriptar = req.session.texto_a_Encriptar;
    var tamanioTexto = req.session.tamanioTexto;
    var textoEncriptado = req.session.textoEncriptado;
    var usuario = req.session.USER_NAME;
    var avisoCerrarSesion = req.session.avisoCerrarSesion;
    var avisoLoginEstado = req.session.avisoLoginEstado;
    var leyoElLeeme = req.session.entroALeeme;

    // Borramos la variable de la sesion
    delete req.session.avisoLoginEstado;

    if(!usuario && !leyoElLeeme){
        mensjeInicio = "Le recomendamos ir al apartado → Leeme...";
    }else{
        mensjeInicio = undefined;
    }

    res.render('index', {
        tituloPagina: 'Bienvenido! 👻💀',
        usuario: usuario,
        restante: pruebas,
        texto_a_Encriptar: texto_a_Encriptar,
        tamanioTexto: tamanioTexto,
        textoEncriptado: textoEncriptado,
        aviso: aviso,
        avisoCerrarSesion: avisoCerrarSesion,
        avisoLoginEstado: avisoLoginEstado,
        mensjeInicio: mensjeInicio
    });
});

module.exports = router;
// Esta es una sección importante que necesita ser completada.