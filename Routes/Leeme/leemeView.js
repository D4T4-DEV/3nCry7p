const express = require('express');
const { session } = require('passport');
const router = express.Router();


// Ruta de renderizado de la vista 
router.get('/', (req, res) => {
    req.session.entroALeeme = true;
    res.render('leeme');
});

// // Ruta de respuesta de la vista
// router.post('/', (req, res) => {
//     res.redirect('/registrarse');
// });

module.exports = router;