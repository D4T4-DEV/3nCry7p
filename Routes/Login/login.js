const express = require('express');
const router = express.Router();
const passport = require('passport');

// Medios propios
const { generateToken } = require('../../Models/autenticacion/autenticacion')


router.post('/', passport.authenticate('local', {
  failureRedirect: '/iniciar-sesion',
}), async (req, res) => {

  // Generamos un token de dada la sesion del usuario que debio autenticarse e existir en DB
  const tokenGenerado = generateToken(req.user.id);
  res.cookie('token', tokenGenerado, { httpOnly: true, secure: false });
  res.redirect('/');
});



module.exports = router;