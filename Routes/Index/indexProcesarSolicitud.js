const express = require('express');
const router = express.Router();

// Importacion de metodos utilizados para encriptar
const CESAR = require('../../Models/Encriptaciones/encryptCesar');
const VIGENERE = require('../../Models/Encriptaciones/encryptVigenere');
const HEX = require('../../Models/Encriptaciones/encryptHexadecimal');
const BASE_SESENTA_Y_CUATRO = require('../../Models/Encriptaciones/encryptBaseSesentaYCuatro');

// Importacion de metodos de la BD
const { loadEncryptBD_UsersSignUp, loadEncryptBD_Guest } = require('../../Database/Acciones_DB/EncriptacionesCargaDB/cargaEncriptacionesDB');
const { authenticateGlobal } = require("../../Models/autenticacion/autenticacion");

router.post('/', authenticateGlobal, async (req, res) => {
    // Variables obtenidas del body
    const { texto_a_Encriptar, metodosEncriptaciones, idiomasCesar, idiomasVigenere, desplazamientos, key } = req.body; // Obtiene el valor de los formularios

    const cookieInvitado = req.cookies['connect.sid']; // Cookie generada por Express
    const id_Usuario = req.session.ID_USER; // 

    try {
        switch (metodosEncriptaciones) {
            case "cesar":

                if (idiomasCesar == 0 || desplazamientos == -1) {
                    req.session.tamanioTexto = texto_a_Encriptar.length;
                    req.session.texto_a_Encriptar = texto_a_Encriptar;
                    req.session.aviso = "ERROR 🤨 No llenaste los campos correspondientes 📝😒";
                    return res.redirect('/');
                }
                
                if(idiomasCesar === "EN" && /^[Ññ]+$/.test(texto_a_Encriptar)){
                    req.session.tamanioTexto = texto_a_Encriptar.length;
                    req.session.texto_a_Encriptar = texto_a_Encriptar;
                    req.session.aviso = "ERROR 🤨 El texto a encriptar en inglés no debe tener Ñ 📝😒";
                    return res.redirect('/');
                }

                req.session.texto_a_Encriptar = texto_a_Encriptar;
                req.session.tamanioTexto = texto_a_Encriptar.length;

                // Configuracion del metodo
                CESAR.idiomAlfabet(idiomasCesar);

                // Transformacion del txt a encriptado
                var texto_encriptado = CESAR.encripytCesar(texto_a_Encriptar, desplazamientos)

                // Subida a la BD
                if (id_Usuario) {
                    await loadEncryptBD_UsersSignUp(id_Usuario, metodosEncriptaciones, idiomasCesar, desplazamientos, null, texto_a_Encriptar, texto_encriptado);
                } else {
                    await loadEncryptBD_Guest(cookieInvitado, metodosEncriptaciones, idiomasCesar, desplazamientos, null, texto_a_Encriptar, texto_encriptado);
                }
                // Paso del resultado a la sesion
                req.session.textoEncriptado = texto_encriptado;

                req.session.aviso = "Haz realizado:\n" +
                    "Metodo: Cesar \n" +
                    "Un texto de: " + texto_a_Encriptar.length + " caracteres\n" +
                    "En el idioma: " + idiomasCesar + "\n" +
                    "Con el número de desplazamientos de: " + desplazamientos;

                console.log(texto_encriptado)
                analizarPruebasRestantes(req, res);
                res.redirect('/');
                break;

            case "vigenere":

                if (idiomasVigenere == 0) {
                    req.session.tamanioTexto = texto_a_Encriptar.length;
                    req.session.texto_a_Encriptar = texto_a_Encriptar;
                    req.session.aviso = "ERROR 🤨 No llenaste los campos correspondientes 📝😒";
                    return res.redirect('/');
                }
                
                if (idiomasVigenere === "EN" && /^[Ñ]+$/.test(key)) {
                    req.session.tamanioTexto = texto_a_Encriptar.length;
                    req.session.texto_a_Encriptar = texto_a_Encriptar;
                    req.session.aviso = "ERROR 🤨 La KEY en inglés no debe tener Ñ 📝😒";
                    return res.redirect('/');
                }

                if (!/^[A-ZÑ]+$/.test(key)) {
                    req.session.tamanioTexto = texto_a_Encriptar.length;
                    req.session.texto_a_Encriptar = texto_a_Encriptar;
                    req.session.aviso = "ERROR 🤨 La KEY no debe tener números ni caracteres especiales, incluido emojis 📝😒";
                    return res.redirect('/');
                }

                req.session.texto_a_Encriptar = texto_a_Encriptar;
                req.session.tamanioTexto = texto_a_Encriptar.length;

                // Transformacion del txt a encriptado
                var texto_encriptado = VIGENERE.encripytVigenere(texto_a_Encriptar, key, idiomasVigenere);

                // Subida a la BD
                if (id_Usuario) {
                    await loadEncryptBD_UsersSignUp(id_Usuario, metodosEncriptaciones, idiomasVigenere, null, key, texto_a_Encriptar, texto_encriptado);
                } else {
                    await loadEncryptBD_Guest(cookieInvitado, metodosEncriptaciones, idiomasVigenere, null, key, texto_a_Encriptar, texto_encriptado);
                }

                // Paso del resultado a la sesion
                req.session.textoEncriptado = texto_encriptado;

                req.session.aviso = "Haz realizado:\n" +
                    "Metodo: Vigenere \n" +
                    "Un texto de: " + texto_a_Encriptar.length + " caracteres\n" +
                    "Con la Key: " + key + "\n";

                console.log(texto_encriptado);
                analizarPruebasRestantes(req, res);
                res.redirect('/');
                break;

            case "hex":
                analizarPruebasRestantes(req, res);

                req.session.texto_a_Encriptar = texto_a_Encriptar;
                req.session.tamanioTexto = texto_a_Encriptar.length;

                // Transformacion del txt a encriptado
                var texto_encriptado = HEX.encripytHex(texto_a_Encriptar);

                // Subida a la BD
                if (id_Usuario) {
                    await loadEncryptBD_UsersSignUp(id_Usuario, metodosEncriptaciones, null, null, null, texto_a_Encriptar, texto_encriptado);
                } else {
                    await loadEncryptBD_Guest(cookieInvitado, metodosEncriptaciones, null, null, null, texto_a_Encriptar, texto_encriptado);
                }

                // Pasamos el texto encriptado a la sesion
                req.session.textoEncriptado = texto_encriptado;

                req.session.aviso = "Haz realizado:\n" +
                    "Metodo: Hexadecimal \n" +
                    "Un texto de: " + texto_a_Encriptar.length + " caracteres\n";

                console.log(texto_encriptado);

                res.redirect('/');
                break;

            case "base64":

                // Detectamos si este contiene emojis, ya que este no los acepta
                if(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(texto_a_Encriptar)){
                    req.session.tamanioTexto = texto_a_Encriptar.length;
                    req.session.texto_a_Encriptar = texto_a_Encriptar;
                    req.session.aviso = "ERROR 🤨 Este metodo no admite emojis 📝😒";
                    return res.redirect('/');
                }

                analizarPruebasRestantes(req, res);

                req.session.texto_a_Encriptar = texto_a_Encriptar;
                req.session.tamanioTexto = texto_a_Encriptar.length;


                // Transformacion del txt a encriptado
                var texto_encriptado = BASE_SESENTA_Y_CUATRO.encripytBase64(texto_a_Encriptar);

                // Subida a la BD
                if (id_Usuario) {
                    await loadEncryptBD_UsersSignUp(id_Usuario, metodosEncriptaciones, null, null, null, texto_a_Encriptar, texto_encriptado);
                } else {
                    await loadEncryptBD_Guest(cookieInvitado, metodosEncriptaciones, null, null, null, texto_a_Encriptar, texto_encriptado);
                }

                // Pasamos el texto encriptado a la sesion
                req.session.textoEncriptado = texto_encriptado;

                req.session.aviso = "Haz realizado:\n" +
                    "Metodo: Base 64 \n" +
                    "Un texto de: " + texto_a_Encriptar.length + " caracteres\n";

                console.log(texto_encriptado);
                res.redirect('/');
                break;

            default:
                req.session.texto_a_Encriptar = texto_a_Encriptar;
                req.session.tamanioTexto = texto_a_Encriptar.length;
                req.session.aviso = "ERROR 🤨 Al parecer no elegiste ningun modo pero si le diste a enviar *llenaste la caja de texto no mas* 📝😒";
                res.redirect('/');
                break;
        }
    } catch (error) {
        req.session.tamanioTexto = texto_a_Encriptar.length;
        req.session.texto_a_Encriptar = texto_a_Encriptar;
        req.session.aviso = "Estamos experimentando problemas, por favor intentalo más tarde...";
        console.log("Error al registrar la encriptacion, con error: " + error + " → BD fuera de linea");
        res.redirect('/');
    }
});


// Funcion para manejar los intentos del usuario
function analizarPruebasRestantes(req, res) {
    if (!req.session.USER_NAME) {
        // Si no existe una variable de sesion de ussa
        return req.session.pruebasRestantes++;
    }
}


// funcion para registrar el texto a la bd
async function uploadDataInDB(texto_a_Encriptar, texto_encriptado, metodosEncriptaciones, idiomasCesar, idiomasVigenere, desplazamientos, key, req, res) {
    try {
        const cookieInvitado = req.cookies['connect.sid']; // Cookie generada por Express
        const id_Usuario = req.session.ID_USER; // 

        // Si existe el usuario que deberia si esta logueado
        if (id_Usuario) {
            if (metodosEncriptaciones === "cesar") {

            } else if (metodosEncriptaciones === "vigenere") {

            } else {

            }
        } else {
            // Si no existe el usuario 
            if (metodosEncriptaciones === "cesar") {

            } else if (metodosEncriptaciones === "vigenere") {
                await loadEncryptBD_Guest(cookieInvitado, metodosEncriptaciones, idiomasVigenere, null, key, texto_a_Encriptar, texto_encriptado);
            } else {
                await loadEncryptBD_Guest(cookieInvitado, metodosEncriptaciones, null, null, null, texto_a_Encriptar, texto_encriptado);
            }
        }
    } catch (error) {
        console.log("Error al registrar la encriptacion en la base de datos:", error);
        throw error;
    }
}

module.exports = router;


// FUNCIONES PARA NO TENER UN MOUSTRO
