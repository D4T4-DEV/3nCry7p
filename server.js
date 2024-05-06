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
const { getUserForUserName, getUserForID, updateLoginCounter } = require('./Database/Acciones_DB/Usuarios/usuariosDB.js');

// Metodo de cifrado
const { compareHash } = require('./Models/Cifrado_PWD_Usuario/pwd_hash_method');

// Variable de aviso para avisos diversos desde el SERVER
var avisoLogin = undefined;
var avisoCerrarSesion = undefined;

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

// Configurar Passport.js
app.use(passport.initialize());
app.use(passport.session());

// CONFIGURACION DE PASSPORT para tokens
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'contrasenia',
},
  async (username, contrasenia, done) => {
    // ASPECTOS QUE HARA LA VERIFICACION

    try {

      const user = await getUserForUserName(username); // Obtenemos el usuario si es que existe en la DB
      if (!user) {
        avisoLogin = "Por favor verifica las credenciales ingresadas";
        console.log("Se ha experimentado este error: " + "Usuario incorrecto" + "\n");
        return done(null, false);
      }

      // Comparamos la contraseña
      const passwordMatch = await compareHash(contrasenia, user.pwd_hash);
      if (!passwordMatch) {
        avisoLogin = "Por favor verifica las credenciales ingresadas";
        console.log("Se ha experimentado este error: " + "Contraseña incorrecta" + "\n");
        return done(null, false);
      }

      await updateLoginCounter(user.id); // Hacemos el update del usuario en la tabla logins_Users

      // Si todo va bien, devolvemos el arreglo de la DB 
      return done(null, user);
    } catch (error) {

      avisoLogin = "Estamos experimentando problemas, por favor Inténtalo más tarde...";

      // Aspecto para el BACK
      console.log("Se ha experimentado este error: " + error);
      console.log("Posible falla → DB SERVER NO ESTA EN LINEA" + "\n");
      return done(null, false); // Manejamos este error por consola debido a que si no esta el server la aplicacion muere
    }
  }
));

// Serializacion del usuario
passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

// Deserializacion
passport.deserializeUser(async (id, done) => {
  await getUserForID(id).then((user) => {
    done(null, user);
  }).catch((error) => {
    done(error, null);
  });
});

// Middleware personalizado para variables de sesion y cookies
app.use((req, res, next) => {

  // Creacion de la variable intentos
  if (!req.session.pruebasRestantes && !req.session.USER_NAME) {
    req.session.pruebasRestantes = 0;
  }

  req.session.avisoCerrarSesion = avisoCerrarSesion;
  avisoCerrarSesion = undefined;


  // Pasamos el valor de la variable creada en el server
  req.session.avisoLogin = avisoLogin; // Pasamos a la sesion
  avisoLogin = undefined; // Devolvemos a su valor origen

  next(); // Damos paso a la ejecucion de otros middlewares
});

// Middleware de contador de peticiones:
app.use((req, res, next) => {
  // Imprime en consola las acciones que se realizan.
  // console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Medio get para cerrar sesion
app.get('/cerrar-sesion', async (req, res) => {
  await req.logout(async (err) => {
    if (err) {
      avisoCerrarSesion = "Error al cerrar sesión, por favor intentelo nuevamente..."
      console.error('Error al cerrar la sesión:', err + "STATUS: 500");
    }
    await req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err + "STATUS: 500");
        avisoCerrarSesion = "Error al cerrar sesión, por favor intentelo nuevamente..."
      }
      console.log('ESTE PROCESO -> req.session.destroy -> ha finalizado correctamente');
      avisoCerrarSesion = "Se ha cerrado sesión";
    });
    res.clearCookie('token');
    res.redirect('/'); // Redirigir a la página principal u otra página de tu elección
  });
});


// Configuración de la plantilla Pug
app.set('view engine', 'pug');
// Hace accesible las vistas (codigo PUG) al server, indicandole la ruta construida por __dirname y concatenando "Views"
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));

// Middleware para poder obtener el contenido de las solicitudes POST en formularios
app.use(express.urlencoded({ extended: true })); // Aceptar Cadenas o arreglos
app.use(express.json()); // -> Entender datos en Formato JSON


//Rutas 
const router = require('./Routes/routes');
app.use('/', router); // Seteo de rutas puestas en el archivo de ROUTS

// Inicializacion del puerto que será ejecutado el server local
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
