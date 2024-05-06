# Proyecto 3nCry7p

## Instrucciones para poder ejecutarlo

Tendrás que cumplir con los siguientes medios:

- Tener instalado Node.js
    - Instalar las siguientes dependencias:
        - Dependencias Generales:
            - bcrypt
            - cookie-parser
            - dotenv
            - express
            - express-session
            - jsonwebtoken
            - mysql2
            - passport
            - passport-local
            - pug
            - sass
        - Dependencias de desarrollador:
            - nodemon
            - npm-run-all

- Tener instalador MySQL Community Server y MySQL Workbench
    - Crear la Base de datos que encontrarás en el directorio de `3nCry7p\Database\Creacion_DB\base de datos.sql`, esto trae lo necesario para que se registre correctamente en la Base de datos 

- Tener un archivo `.env` en la raíz del proyecto en donde debera contener los siguientes valores
    - `MYSQL_HOST` → Corresponde al host usualmente `localhost` o  `127.0.0.1`.
    - `MYSQL_USER` → Corresponde al usuario con el que se creo la base de datos.
    - `MYSQL_PWD` → Corresponde a la contraseña del usuario de la base de datos.
    - `MYSQL_DATABASE` → Corresponde al nombre de la base de datos, en nuestro caso `encripta_web`.
    - `PASSWORD_SALT_ROUNDS` → Corresponde a las vueltas que tomara `bcrypt` para encriptar la contraseña del usuario.
    - `ACCESS_TOKEN_SECRET` → Corresponde a la palabra secreta que usará `passport`.


### Instrucciones para poder ejecutarlo

- Para ejecutarlo bastará con correr el siguiente comando en terminal:
    - `npm start` y esta empezará a correr en el puerto `3000`


#### Nota: 
Si no quieres instalar una a una las dependencias puedes correr los siguientes comandos estando dentro del directorio del proyecto (usando la terminal):

- Dependencias Generales:
    - `npm i bcrypt cookie-parser dotenv express express-session jsonwebtoken mysql2 passport passport-local pug sass`

- Dependencias de desarrollador:
    - `npm i nodemon npm-run-all -D`


