const connection = require('../../conexionBd'); // Referencia de la conexion

async function loadEncryptBD(id_usuario, tipo_de_encriptacion, idioma, desplazamientos, key, texto_sin_encriptar, texto_encriptado) {
    const bdConecction = await connection.getConnectionDB();
    try {
        await bdConecction.query('INSERT INTO Encriptaciones (id_usuario, tipo_de_encriptacion, idioma, desplazamientos, key_util, texto_sin_encriptar, texto_encriptado)' +
            'VALUES (?, ?, ?, ?, ?, ?)',
            [   id_usuario,
                tipo_de_encriptacion,
                idioma, 
                desplazamientos,
                key,
                texto_sin_encriptar,
                texto_encriptado]
        );
        console.log('Se ha registrado correctamente');
    } catch (error) {
        console.error('No se que hiciste pero acaba de CAER: ', error);
        throw error;
    }
}

module.exports = {
    loadEncryptBD
};