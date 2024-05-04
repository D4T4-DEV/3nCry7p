const {getConnectionDB} = require('../../conexionBd'); // Referencia de la conexion

async function getHistoryForUser(id_user){
    const bdConecction = await getConnectionDB(); // Tomamos la conexion
    try {
        const [results] = await bdConecction.query('SELECT * FROM Encriptaciones WHERE id_usuario = (?)', [id_user]);
        
        return results;
    } catch (error) {
        console.error('No se tienen coincidencias', error);
        throw error;
    } finally {
        bdConecction.release();
    }
}

// Exportaciones 
module.exports = {
    getHistoryForUser
};