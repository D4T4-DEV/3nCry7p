
/*
    Esta manera de encriptar o mejor dicho, convertir un medio, viene de la formula de 
    decimal a hexadecimal, debido a que la representacion de los caracteres viene dada 
    por el codigo ASCII, en donde estos son numeros, lo cual podemos hacer uso de estos 
    para poder convertir ese numero decimal a hexadecimal.
    https://elcodigoascii.com.ar/ → Representacion de los caracteres en modo ASCII
    

*/

function encripytHex(texto) {
    var textoEncriptado = "";

    // Recorremos cada caracter ingresado
    for (var i = 0; i < texto.length; i++) {

        var ASCII = texto.charCodeAt(i).toString(16);

        if (ASCII.length < 2) {
            textoEncriptado += '0' + ASCII; // Considera los valores exactos como son A,B,C,D,E,F -> Esto por los resultados de dos elementos ej. "0E"
        } else {
            textoEncriptado += ASCII;
        }

        // texto.charCodeAt(i); -> Representa el valor decimal del codigo (tomado del codigo ASCII)
        // .toString(16) -> Representa la base que sera usada, en este cado en base 16.
    }
    return textoEncriptado;
}

function decryptHex(textoEncriptado) {
    var textoDescifrado = "";

    for (var i = 0; i < textoEncriptado.length; i += 2) {
        var codigoHex = textoEncriptado.substring(i, i + 2); // substring(i, i + 2) -> Se mueve entre la cadena, tomando el valor de I y este toma un conjunto de 2 valores de la misma
        var numeroEntero = parseInt(codigoHex, 16); // -> Transformamos a decimal la equivalencia de la letra en caso de serlo
        var caracterDescifrado = String.fromCharCode(numeroEntero); //  String.fromCharCode(numeroEntero) -> Toma el valor del codigo ASCII (numero) y lo convierte a letra
        textoDescifrado += caracterDescifrado; 
    }

    return textoDescifrado;
}

// Exportacion de modulos
module.exports = {
    encripytHex,
    decryptHex
}
