CREATE DATABASE IF NOT EXISTS encripta_web;

USE encripta_web;

CREATE TABLE IF NOT EXISTS Usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL, 
    pwd_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Encriptaciones(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL, -- Esto para saber que usuario lo solicito
    tipo_de_encriptacion VARCHAR(100) NOT NULL, -- Saber que modo de encriptacion elijio
    idioma VARCHAR(20), -- Esto para los metodos que usen un idioma (alfabeto)
    desplazamientos INT,-- Esto para los metodos que usen un desplazamiento (alfabeto)
    key_util varchar(10), -- Esto para los metodos que utilican una key
    texto_sin_encriptar TEXT NOT NULL,
    texto_encriptado LONGTEXT NOT NULL,
    fecha_de_registrro TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Esto para saber la fecha y hora realizada
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

CREATE TABLE IF NOT EXISTS loadEncryptBD_Guest(
	id INT PRIMARY KEY AUTO_INCREMENT,
    cookie_invitado LONGTEXT NOT NULL, -- Esto para saber que usuario lo solicito
    tipo_de_encriptacion VARCHAR(100) NOT NULL, -- Saber que modo de encriptacion elijio
    idioma VARCHAR(20), -- Esto para los metodos que usen un idioma (alfabeto)
    desplazamientos INT,-- Esto para los metodos que usen un desplazamiento (alfabeto)
    key_util varchar(10), -- Esto para los metodos que utilican una key
    texto_sin_encriptar TEXT NOT NULL,
    texto_encriptado LONGTEXT NOT NULL,
    fecha_de_registrro TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Esto para saber la fecha y hora realizada
);

-- CREATE TABLE IF NOT EXISTS Curiosos(
-- );