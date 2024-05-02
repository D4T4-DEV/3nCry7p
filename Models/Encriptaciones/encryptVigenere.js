const encripytCesar = require("./encryptCesar");

function encripytVigenere(texto, clave, idioma) {

    // Decimos a cesar que lenguaje usar
    encripytCesar.idiomAlfabet(idioma);

    var encripytVigenere = "";

    for (var i = 0; i < texto.length; i++) {
        var letra = texto.charAt(i);
        var claveActual = clave.charAt(i % clave.length);
        var desplazamiento = claveActual.charCodeAt(0) - 'A'.charCodeAt(0);
        encripytVigenere += encripytCesar.encripytCesar(letra, desplazamiento);
    }
    return encripytVigenere;
}

function decrypVigenere(textoCifrado, clave, idioma) {

    // Decimos en que lenguaje estara la encriptacion

    encripytCesar.idiomAlfabet(idioma);

    // Tomamos de referencia el tamaño del alfabeto
    var tamanioAlfabeto = 0;

    switch (idioma) {
        case "ES":
            tamanioAlfabeto = 27;
            break;

        case "EN":
            tamanioAlfabeto = 26;
            break;

        default:
            break;
    }

    // Variable de resultado de la desencriptacion
    var decrypVigenere = "";

    // Variable de desplazamiento y su inverso
    var desplazamiento = 0;
    var desplazamientoInverso = 0;

    // Recorremos cada elemento de la cadena recibida
    for (var i = 0; i < textoCifrado.length; i++) {

        var letraCifrada = textoCifrado.charAt(i); // Devuelve el caracter en la posicion de i (Básicamente recorre cada uno de los componentes)
        var claveActual = clave.charAt(i % clave.length);
        /*
            Ejemplo:
            mensaje = Bell = Letras = 4
            key = KEY = Letras = 3

            supongamos que estamos en el 0 y iremos hasta el dos 
            0 mod 3 = 0 -> Devolvemos el mismo caracter K
            1 mod 3 = 1 -> Devolvemos el mismo caracter E
            2 mod 3 = 2 -> Devolvemos el mismo caracter Y
            3 mod 3 = 0 -> Devolvemos el primer caracter 

            NOTA: Esto se hace para rellenar los espacios vacios que pueda tener la clave o el mensaje
        */
        desplazamiento = claveActual.charCodeAt(0) - 'A'.charCodeAt(0); // Calculamos el valor de la clave en valor de la clave en comparacion a la A del codigo ASCII
        var desplazamientoInverso = (tamanioAlfabeto - desplazamiento) % tamanioAlfabeto; // Desplazamiento inverso calculador con x = (tamanio alfabeto - desplazamiento)
        decrypVigenere += encripytCesar.encripytCesar(letraCifrada, desplazamientoInverso); // Usamos el metodo cesar por estar comprometido el desplazamiento a modo valor ASCII y no a letra normal
    }
    return decrypVigenere;
}

module.exports = {
    encripytVigenere,
    decrypVigenere
}


// console.log(decrypVigenere(encripytVigenere("LOREM IPSUM DOLOR SESO", "YY", "ES"), "YY", "ES"))

/*
Referencias para realizarlo
https://www.ugr.es/~anillos/textos/pdf/2012/EXPO-1.Criptografia/02a11.htm#:~:text=El%20cifrado%20Vigen%C3%A8re%20es%20un,se%20ha%20reinventado%20muchas%20veces.
https://www.youtube.com/watch?v=RLN-4yNWvYM

*/