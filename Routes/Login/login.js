const express = require('express');
const router = express.Router();
const passport = require('passport');

// Medios propios
const {generateToken} = require('../../Models/autenticacion/autenticacion')


router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
}), async (req, res) => {
    // Si se autentica correctamente, crea un token JWT
    const token = generateToken(req.user.id);

    res.cookie('token', token, { httpOnly: true, secure: false });

    res.redirect('/');
});


module.exports = router;