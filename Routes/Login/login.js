const express = require('express');
const router = express.Router();
const passport = require('passport');

// Medios propios
const {generateToken} = require('../../Models/autenticacion/autenticacion')


// router.post('/', async (req, res) => {

//     const { username, password} = req.body; // Obtiene el valor de los formularios
//     console.log(username)
//     console.log(password)
//     res.redirect("/iniciar-sesion")
// });

router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
  }), async (req, res) => {
    res.redirect('/');
  });

module.exports = router;