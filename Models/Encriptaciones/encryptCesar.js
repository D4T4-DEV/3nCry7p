// Usamos este medio para poder aligerar la busqueda de cada elemento del alfabeto
// entre cada palabra, ya que map ayuda a una busqueda eficiente
const alfabetoMap = new Map();
var alfabeto = "";

function idiomAlfabet(idioma) {
    switch (idioma) {
        case "ES":
            alfabeto = "abcdefghijklmnñopqrstuvwxyz";
            break;

        case "EN":
            alfabeto = "abcdefghijklmnopqrstuvwxyz";
            break;
    }
    for (var i = 0; i < alfabeto.length; i++) {
        alfabetoMap.set(alfabeto[i], i); // Asignamos la clave y el valor ejemplo 1 → A, 2 → B, ...
    }
}


function encripytCesar(palabra, posicion) {
    var posicionFinal = 0;
    var mensajeEncriptado = "";

    // Recorremos cada uno de las letras de la palabra
    for (var letra of palabra) {
        /*
            Este medio representa la formula: 
                f(x) = (x + n) mod p, donde:
                
                p = logintud del alfabeto
                x = numero asociado al alfabeto sin moverse (ej. A → 1, B → 2, ...)
                n = representa el numero de letras a moverse
        */

        if (alfabetoMap.get(letra.toLowerCase()) === undefined) {
            mensajeEncriptado += letra;
        } else {

            if (alfabetoMap.get(letra) === alfabetoMap.get(letra.toUpperCase())) {
                // FORMULA
                posicionFinal = (alfabetoMap.get(letra.toLowerCase()) + posicion) % alfabeto.length;
                // Concatenamos dada la representacion de la letra en el abecedario
                mensajeEncriptado += letraRepresentada(posicionFinal).toUpperCase();
            } else {
                // FORMULA
                posicionFinal = (alfabetoMap.get(letra.toLowerCase()) + posicion) % alfabeto.length;
                // Concatenamos dada la representacion de la letra en el abecedario
                mensajeEncriptado += letraRepresentada(posicionFinal);
            }
        }
    }
    return mensajeEncriptado;
}

function decrypCesar(palabra, posicion) {
    var posicionFinal = 0;
    var mensajeEncriptado = "";

    // Recorremos cada uno de las letras de la palabra
    for (var letra of palabra) {
        /*
            Este medio representa la formula reversa: 
                f(x) = (x - n) mod p, donde:
                
                p = logintud del alfabeto
                x = numero asociado al alfabeto sin moverse (ej. A → 1, B → 2, ...)
                n = representa el numero de letras a moverse
        */

        if (alfabetoMap.get(letra.toLowerCase()) === undefined) {
            mensajeEncriptado += letra;
        } else {

            if (alfabetoMap.get(letra) === alfabetoMap.get(letra.toUpperCase())) {
                // FORMULA
                posicionFinal = (alfabetoMap.get(letra.toLowerCase()) - posicion) % alfabeto.length;
                // Concatenamos dada la representacion de la letra en el abecedario
                mensajeEncriptado += letraRepresentada(posicionFinal).toUpperCase();
            } else {
                // FORMULA
                posicionFinal = (alfabetoMap.get(letra.toLowerCase()) - posicion) % alfabeto.length;
                // Concatenamos dada la representacion de la letra en el abecedario
                mensajeEncriptado += letraRepresentada(posicionFinal);
            }
        }
    }
    return mensajeEncriptado;
}


function letraRepresentada(posicion) {
    // Devuelve la letra que representa dada la posicion
    return alfabeto.charAt(posicion);
}

module.exports = {
    idiomAlfabet,
    encripytCesar,
    decrypCesar
};