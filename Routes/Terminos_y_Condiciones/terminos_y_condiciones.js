const express = require('express');
const router = express.Router();


// Ruta de renderizado de la vista 
router.get('/', (req, res) => {
    res.render('terminos_y_condiciones');
});

// Ruta de respuesta de la vista
router.post('/', (req, res) => {
    res.redirect('/registrarse');
});

module.exports = router;