// Obtenemos las referencias a las librerias
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config(); // Configuramos dotenv

async function generateHashForAnything(planeText) {
    return await bcrypt.hash(planeText, parseInt(process.env.PASSWORD_SALT_ROUNDS)); // la llamada a la funcion de la clase, ya devuelve un await
}

async function compareHash(planeText, Hash) {
    return await bcrypt.compare(planeText, Hash);
}

module.exports = {
    generateHashForAnything,
    compareHash
};