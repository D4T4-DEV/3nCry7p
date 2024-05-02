const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Configuracion del dotenv para acceder a las variables de entorno

// Creacion del POOL para MySQL 
const POOL_Connection = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
 
function getConnectionDB() {
    return POOL_Connection.promise().getConnection(); // Pasamos el parametro como una promesa y de esta obtenemos la conexion del POOL
}

module.exports = {
    getConnectionDB
};