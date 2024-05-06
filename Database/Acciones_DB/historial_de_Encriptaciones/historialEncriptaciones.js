const {getConnectionDB} = require('../../conexionBd'); // Referencia de la conexion

async function getHistoryForUser(id){
    const bdConecction = await getConnectionDB(); // Tomamos la conexion
    try {

        const [results] = await bdConecction.query('SELECT * FROM Encriptaciones WHERE id_usuario = (?)', [parseInt(id)]);
        return results;
    } catch (error) {
        console.error('Algo fue mal al ejecutar el getHistoryForUser(), con error → ', error);
        throw error;
    }finally{
        bdConecction.release();
    }
}

// console.log(getHistoryForUser(1));

// Exportaciones 
module.exports = {
    getHistoryForUser
};