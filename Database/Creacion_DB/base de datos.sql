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
    fecha_de_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Esto para saber la fecha y hora realizada
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

CREATE TABLE IF NOT EXISTS loadEncrypt_Guest(
	id INT PRIMARY KEY AUTO_INCREMENT,
    cookie_invitado LONGTEXT NOT NULL, -- Esto para saber que usuario lo solicito
    tipo_de_encriptacion VARCHAR(100) NOT NULL, -- Saber que modo de encriptacion elijio
    idioma VARCHAR(20), -- Esto para los metodos que usen un idioma (alfabeto)
    desplazamientos INT,-- Esto para los metodos que usen un desplazamiento (alfabeto)
    key_util varchar(10), -- Esto para los metodos que utilican una key
    texto_sin_encriptar TEXT NOT NULL,
    texto_encriptado LONGTEXT NOT NULL,
    fecha_de_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Esto para saber la fecha y hora realizada
);

CREATE TABLE IF NOT EXISTS logins_Users(
		id INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario_tabla INT NOT NULL,
        num_login INT NOT NULL,
        first_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Medio para poder registrar su primer login del usuario
		fecha_de_registro_last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Medio para poder registrar la ultima conexion
		FOREIGN KEY (id_usuario_tabla) REFERENCES Usuarios(id)
);

CREATE TABLE IF NOT EXISTS log_out_Users(
		id INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario_tabla INT NOT NULL,
        num_log_out INT NOT NULL,
        first_log_out TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Medio para poder registrar su primer login del usuario
		fecha_de_registro_last_log_out TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Medio para poder registrar la ultima conexion
		FOREIGN KEY (id_usuario_tabla) REFERENCES Usuarios(id)
);

-- Procedimientos almacenados

-- PROCEDIMIENTO PARA ACTUALIZAR LA TABLA logins_Users, CUANDO EL USUARIO SE REGISTRE
DELIMITER //

CREATE PROCEDURE verify_and_count_logins(IN id_usuario INT)
BEGIN 
	DECLARE contador INT;

	-- este medio sirve para verificar que exista un registro
	SELECT COUNT(*) INTO contador FROM logins_Users WHERE id_usuario_tabla = id_usuario;
    
    
    IF contador > 0 THEN
		-- si existe un registro lo actualiza sumandole uno al valor de login que tenia
		UPDATE logins_Users SET num_login = (num_login + 1), fecha_de_registro_last_login = NOW()  WHERE id_usuario_tabla = id_usuario;
	ELSE 
    -- si no existe un registro lo registra
		INSERT INTO logins_Users (id_usuario_tabla, num_login, first_login) VALUES (id_usuario, 1, NOW());
	END IF;
END //

DELIMITER ;

-- PROCEDIMIENTO PARA ACTUALIZAR LA TABLA logins_Users, CUANDO EL USUARIO SE REGISTRE
DELIMITER //

CREATE PROCEDURE verify_and_count_log_outs(IN id_usuario INT)
BEGIN 
	DECLARE contador INT;

	-- este medio sirve para verificar que exista un registro
	SELECT COUNT(*) INTO contador FROM log_out_Users WHERE id_usuario_tabla = id_usuario;
    
    
    IF contador > 0 THEN
		-- si existe un registro lo actualiza sumandole uno al valor de login que tenia
		UPDATE log_out_Users SET num_log_out = (num_log_out + 1), fecha_de_registro_last_log_out = NOW()  WHERE id_usuario_tabla = id_usuario;
	ELSE 
    -- si no existe un registro lo registra
		INSERT INTO log_out_Users (id_usuario_tabla, num_log_out, first_log_out) VALUES (id_usuario, 1, NOW());
	END IF;
END //

DELIMITER ;

-- Ejemplo de uso de este ->
--  call verify_and_count_logins('1');
--  call verify_and_count_log_outs('1');