const express = require('express');
const router = express.Router();
const passport = require('passport');

// Medios propios
const {generateToken} = require('../../Models/autenticacion/autenticacion')


router.post('/', async (req, res) => {

    const { username, contrasenia} = req.body; // Obtiene el valor de los formularios
    console.log(username)
    console.log(contrasenia)
    res.redirect("/iniciar-sesion")
});



module.exports = router;