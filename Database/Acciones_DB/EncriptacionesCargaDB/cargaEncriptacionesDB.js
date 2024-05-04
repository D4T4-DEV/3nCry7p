const connection = require('../../conexionBd'); // Referencia de la conexion

async function loadEncryptBD_UsersSignUp(id_usuario, tipo_de_encriptacion, idioma, desplazamientos, key, texto_sin_encriptar, texto_encriptado) {
    const bdConecction = await connection.getConnectionDB();
    try {
        await bdConecction.query('INSERT INTO Encriptaciones (id_usuario, tipo_de_encriptacion, idioma, desplazamientos, key_util, texto_sin_encriptar, texto_encriptado)' +
            'VALUES (?, ?, ?, ?, ?, ?, ?)',
            [   id_usuario,
                tipo_de_encriptacion,
                idioma, 
                desplazamientos,
                key,
                texto_sin_encriptar,
                texto_encriptado]
        );
        console.log('Se subido correctamente los datos en modo logueado a la DB');
    } catch (error) {
        console.error('No se que hiciste pero acaba de CAER: ', error);
        throw error;
    } finally {
        bdConecction.release();
    }
}

async function loadEncryptBD_Guest(id_usuario, tipo_de_encriptacion, idioma, desplazamientos, key, texto_sin_encriptar, texto_encriptado) {
    const bdConecction = await connection.getConnectionDB();
    try {
        await bdConecction.query('INSERT INTO loadEncrypt_Guest (cookie_invitado, tipo_de_encriptacion, idioma, desplazamientos, key_util, texto_sin_encriptar, texto_encriptado)' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?)',
            [   id_usuario,
                tipo_de_encriptacion,
                idioma, 
                desplazamientos,
                key,
                texto_sin_encriptar,
                texto_encriptado]
        );
        console.log('Se subido correctamente los datos en modo invitado a la DB');
    } catch (error) {
        console.error('No se qué hiciste pero acaba de CAER: ', error);
        throw error;
    } finally {
        bdConecction.release();
    }
}

module.exports = {
    loadEncryptBD_UsersSignUp,
    loadEncryptBD_Guest
};