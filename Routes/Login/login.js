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

  // Creamos variables de la nueva sesion que contengan ese valor
  req.session.ID_USER = req.user.id;
  req.session.USER_NAME = req.user.user_name;

  res.cookie('token', tokenGenerado, { httpOnly: true, secure: false });
  res.redirect('/');
});



module.exports = router;