const express = require('express');
const router = express.Router();

// Importacion de metodos utilizados para encriptar
const CESAR = require('../../Models/Encriptaciones/encryptCesar');
const VIGENERE = require('../../Models/Encriptaciones/encryptVigenere');
const HEX = require('../../Models/Encriptaciones/encryptHexadecimal');
const BASE_SESENTA_Y_CUATRO = require('../../Models/Encriptaciones/encryptBaseSesentaYCuatro');

// Importacion de metodos de la BD



router.post('/', async (req, res) => {
    // Variables obtenidas del body
    const { texto_a_Encriptar, metodosEncriptaciones, idiomasCesar, idiomasVigenere, desplazamientos, key } = req.body; // Obtiene el valor de los formularios

    switch (metodosEncriptaciones) {
        case "cesar":
            if(idiomasCesar == 0 || desplazamientos == -1){
                req.session.tamanioTexto = texto_a_Encriptar.length;
                req.session.texto_a_Encriptar = texto_a_Encriptar;
                req.session.aviso = "ERROR 🤨 No llenaste los campos correspondientes 📝😒";
                return res.redirect('/');
            }
            req.session.texto_a_Encriptar = texto_a_Encriptar;
            req.session.tamanioTexto = texto_a_Encriptar.length;

            req.session.aviso = "Haz realizado:\n" +
            "Metodo: Cesar \n" +
            "Un texto de: " + texto_a_Encriptar.length +" caracteres\n" +
            "En el idioma: " + idiomasCesar +"\n" +
            "Con el número de desplazamientos de: " + desplazamientos;

            CESAR.idiomAlfabet(idiomasCesar);
            req.session.textoEncriptado = CESAR.encripytCesar(texto_a_Encriptar, desplazamientos);
            console.log(CESAR.encripytCesar(texto_a_Encriptar, desplazamientos))

            res.redirect('/');
            break;

        case "vigenere":

            if(!/^[A-ZÑ]+$/.test(key)){
                req.session.tamanioTexto = texto_a_Encriptar.length;
                req.session.texto_a_Encriptar = texto_a_Encriptar;
                req.session.aviso = "ERROR 🤨 La KEY no debe tener números ni caracteres especiales 📝😒";
                return res.redirect('/');
            }

            if(idiomasVigenere === "EN" && !/^[A-Z]+$/.test(key)){
                req.session.tamanioTexto = texto_a_Encriptar.length;
                req.session.texto_a_Encriptar = texto_a_Encriptar;
                req.session.aviso = "ERROR 🤨 La KEY en inglés no debe tener Ñ 📝😒";
                return res.redirect('/');
            }

            if(idiomasVigenere == 0){
                req.session.tamanioTexto = texto_a_Encriptar.length;
                req.session.texto_a_Encriptar = texto_a_Encriptar;
                req.session.aviso = "ERROR 🤨 No llenaste los campos correspondientes 📝😒";
                return res.redirect('/');
            }
            req.session.texto_a_Encriptar = texto_a_Encriptar;
            req.session.tamanioTexto = texto_a_Encriptar.length;

            req.session.aviso = "Haz realizado:\n" +
            "Metodo: Vigenere \n" +
            "Un texto de: " + texto_a_Encriptar.length +" caracteres\n" +
            "Con la Key: " + key +"\n";

            req.session.textoEncriptado = VIGENERE.encripytVigenere(texto_a_Encriptar, key, idiomasVigenere);
            console.log(VIGENERE.encripytVigenere(texto_a_Encriptar, key, idiomasVigenere));
            res.redirect('/');
            break;

        case "hex":
            req.session.texto_a_Encriptar = texto_a_Encriptar;
            req.session.tamanioTexto = texto_a_Encriptar.length;

            req.session.aviso = "Haz realizado:\n" +
            "Metodo: Hexadecimal \n" +
            "Un texto de: "+ texto_a_Encriptar.length +" caracteres\n";

            req.session.textoEncriptado = HEX.encripytHex(texto_a_Encriptar);
            console.log(HEX.encripytHex(texto_a_Encriptar));
            res.redirect('/');
            break;

        case "base64":
            req.session.texto_a_Encriptar = texto_a_Encriptar;
            req.session.tamanioTexto = texto_a_Encriptar.length;

            req.session.aviso = "Haz realizado:\n" +
            "Metodo: Base 64 \n" +
            "Un texto de: "+ texto_a_Encriptar.length +" caracteres\n";

            req.session.textoEncriptado = BASE_SESENTA_Y_CUATRO.encripytBase64(texto_a_Encriptar);
            console.log(BASE_SESENTA_Y_CUATRO.encripytBase64(texto_a_Encriptar));
            res.redirect('/');
            break;

        default:
            req.session.texto_a_Encriptar = texto_a_Encriptar;
            req.session.tamanioTexto = texto_a_Encriptar.length;
            req.session.aviso = "ERROR 🤨 Al parecer no elegiste ningun modo pero si le diste a enviar *llenaste la caja de texto no mas* 📝😒";
            res.redirect('/');
            break;
    }

});

module.exports = router;


// FUNCIONES PARA NO TENER UN MOUSTRO
