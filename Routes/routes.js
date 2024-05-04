/*
    Este archivo sirve para enrutar todas aquellas paginas que son 
    necesarias para el funcionamiento de la pagina web
*/

const express = require('express');
const router = express.Router();

//  IMPORTACIÓN DE RUTAS

// Ruta principal
const indexView = require('./Index/indexVista');
const indexProcesar = require('./Index/indexProcesarSolicitud');

// Ruta de login
const loginView = require('./Login/loginVista'); 
const login = require('./Login/login');

// Ruta para Singup
const SignUpView = require('./SignUp/registrarteVista');
const SignUpRegister = require('./SignUp/registrar');

// Ruta para terminos y condiciones 
const terminos_y_condicionesView = require('./Terminos_y_Condiciones/terminos_y_condiciones');

// Ruta para historial
const historialEncriptacion = require('./Historial_Encriptaciones/historialEncriptacionesView');

// CONFIGURACIÓN DE RUTAS

// Configuracion index
router.use('/', indexView);
router.use('/procesar-encriptacion',indexProcesar);

// Configuracion login
router.use('/iniciar-sesion', loginView);
router.use('/iniciar-sesion-proceso', login);

// Configuracion de Sign Up
router.use('/registrarse', SignUpView); 
router.use('/registrar-new-user', SignUpRegister); 

// Configuracion de terminos y condiciones
router.use('/terminos-y-condiciones', terminos_y_condicionesView); 

// Configuracion para historial
router.use('/historial', historialEncriptacion); 

module.exports = router;