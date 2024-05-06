const { getConnectionDB } = require('../../conexionBd'); // Referencia de la conexion

// SECCION REGISTRO

async function registrarUsuario(Usuario, Email, Contrasenia) {
    const bdConecction = await getConnectionDB(); // Tomamos la conexion
    try {
        await bdConecction.query('INSERT INTO Usuarios (user_name, email, pwd_hash) VALUES (?, ?, ?)', [Usuario, Email, Contrasenia]);
        console.log('Usuario creado correctamente');
    } catch (error) {
        console.error('Error al crear al usuario:', error);
        throw error;
    } finally {
        bdConecction.release();
    }
}

// SECCION LOGIN
async function getUserForUserName(userName) {
    const bdConecction = await getConnectionDB(); // Tomamos la conexion
    try {
        const [results] = await bdConecction.query('SELECT * FROM Usuarios WHERE user_name = (?)', [userName]);
        // Devolvemos lo que haya buscado dada la condicion
        return results[0];
    } catch (error) {
        console.error('No se tienen coincidencias del usario por nombre: ', error);
        throw error;
    } finally {
        bdConecction.release();
    }
}


async function getUserForID(id) {
    const bdConecction = await getConnectionDB(); // Tomamos la conexion
    try {
        const [results] = await bdConecction.query('SELECT * FROM Usuarios WHERE id = (?)', [id]);
        // Devolvemos lo que haya buscado dada la condicion
        return results[0];
    } catch (error) {
        console.error('No se tienen coincidencias del usuario por ID: ', error);
        throw error;
    } finally {
        bdConecction.release();
    }
}

async function updateLoginCounter(id) {
    const bdConecction = await getConnectionDB(); // Tomamos la conexion

    try {
        await bdConecction.query('call verify_and_count_logins(?)', [id]);
        console.log("Se ha registrado correctamente el login del usuario con ID: " + id);
    } catch (error) {
        console.log("Error al utilizar el procedimiento de la BD, con error " + error);
    } finally {
        bdConecction.release();
    }
}

// console.log(updateLoginCounter(1));

// Exportaciones 
module.exports = {
    registrarUsuario,
    getUserForUserName,
    getUserForID,
    updateLoginCounter
};