// Medios de inicializacion de las librerias
// express
const express = require('express');
const app = express();
// dotenv
const dotenv = require('dotenv'); // Aspecto para poder tomar las variables de entorno
dotenv.config();
// express-session
const session = require('express-session');
// Path
const path = require('path');
// PASPORT
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// CookieParser
const cookieParser = require('cookie-parser');

// Metodos de DB
const {getUserForUserName, getUserForID} = require('./Database/Acciones_DB/Usuarios/usuariosDB.js');

// Metodo de cifrado
const {compareHash} = require('./Models/Cifrado_PWD_Usuario/pwd_hash_method')

// MIDDLEWARES

// Middleware para gestionar las cookies
app.use(cookieParser());

// Middleware para crear sesiones
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET, // Palabra que se usara para cifrar las sesiones
  resave: false,
  saveUninitialized: false,
  //store: -> Esto lo podemos poner para poder guardar las sesion en un lugar por el momento no
}));

// Configuración de la plantilla Pug
app.set('view engine', 'pug');
// Hace accesible las vistas (codigo PUG) al server, indicandole la ruta construida por __dirname y concatenando "Views"
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));

// Middleware para poder obtener el contenido de las solicitudes POST en formularios
app.use(express.urlencoded({ extended: true })); // Aceptar Cadenas o arreglos
app.use(express.json()); // -> Entender datos en Formato JSON

// Configurar Passport.js
app.use(passport.initialize());
app.use(passport.session());

// CONFIGURACION DE PASSPORT para tokens


//Rutas 
const router = require('./Routes/routes');
app.use('/', router); // Seteo de rutas puestas en el archivo de ROUTS

// Inicializacion del puerto que será ejecutado el server local
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
