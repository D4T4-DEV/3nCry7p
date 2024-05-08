const encripytCesar = require("./encryptCesar");

function encripytVigenere(texto, clave, idioma) {

    // Decimos a cesar que lenguaje usar
    encripytCesar.idiomAlfabet(idioma);

    var encripytVigenere = "";
    var desplazamientoCongruente = 0;

    /*
        Explicacion: Cuando usabamos el metodo:
        
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

        La i del medio "clave.charAt(i % clave.length)" hacia que si la clave era corta, se complete, considerando
        el valor del espacio, caracter o numero, cosa que esta "mál", debido a que debemos considerar solo
        caracteres alfabeticos, teniendo que crear un medio que deba completarse al ser una letra y no otro caracter,
        de aqui nace el siguiente medio:

        function encripytVigenere(texto, clave, idioma) {

            // Decimos a cesar que lenguaje usar
            encripytCesar.idiomAlfabet(idioma);

            var encripytVigenere = "";

            for (var i = 0; i < texto.length; i++) {
                if(/[a-zñA-ZÑ]/.test(letra)){
                    var claveActual = clave.charAt(desplazamientoCongruente % clave.length);
                    console.log(claveActual)
                    var desplazamiento = claveActual.charCodeAt(0) - 'A'.charCodeAt(0);
                    encripytVigenere += encripytCesar.encripytCesar(letra, desplazamiento);
                    desplazamientoCongruente++;
                }else{
                    encripytVigenere += letra;
                }
            }
            return encripytVigenere;
        }

        Este trozo de codigo verifica que solo sean caracteres alfabeticos y en caso de hacerlo la variable
        "desplazamientoCongruente" se aumentará una vez complete el algoritmo, para que sea posible poder generar 
        la clave en cada iteración ejemplo de ello:

        HOLA MUNDO 

        CLAVE: LIMON -> 

            Ejemplo:
            key = LIMON = Letras = 5

            supongamos que estamos en el 0 y iremos hasta el dos 
            "n" mod tamanioClave
            "0" mod 5 = 0 -> Devolvemos el mismo caracter L
            "1" mod 5 = 1 -> Devolvemos el mismo caracter I
            "2" mod 5 = 2 -> Devolvemos el mismo caracter M
            "3" mod 5 = 3 -> Devolvemos el mismo caracter O
            "4" mod 5 = 4 -> Devolvemos el mismo caracter N -> En este punto entra en acción el if, ya que comprueba no el espacio si no la letra M

            "n" ---> Este solo cambiara el valor de cuando se compruebe que realemente fue un caracter

    */

    for (var i = 0; i < texto.length; i++) {
        var letra = texto.charAt(i); // Devuelve la letra de la posición

        if (/[a-zñA-ZÑ]/.test(letra)) {
            var claveActual = clave.charAt(desplazamientoCongruente % clave.length);
            console.log(claveActual)
            var desplazamiento = claveActual.charCodeAt(0) - 'A'.charCodeAt(0);
            encripytVigenere += encripytCesar.encripytCesar(letra, desplazamiento);
            desplazamientoCongruente++;
        } else {
            encripytVigenere += letra;
        }
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


// Pruebas
// console.log(encripytVigenere("Hola😍 mundo°🤣❤️", "LIMON", "EN"));
// console.log(decrypVigenere(encripytVigenere("LOREM IPSUM DOLOR SESO", "YY", "ES"), "YY", "ES"))

/*
Referencias para realizarlo
https://www.ugr.es/~anillos/textos/pdf/2012/EXPO-1.Criptografia/02a11.htm#:~:text=El%20cifrado%20Vigen%C3%A8re%20es%20un,se%20ha%20reinventado%20muchas%20veces.
https://www.youtube.com/watch?v=RLN-4yNWvYM

*/