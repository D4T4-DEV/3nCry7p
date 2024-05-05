// Este medio encripta en base 64 el tecto proveniente, esto nativamente desde JS

function encripytBase64(texto) {
    return btoa(texto); // btoa() -> Encripta el texto en Base64
}

function decryptBase64(texto) {
    return atob(texto); // atob() -> Desencripta el texto en Base64
}

// const palabv = `Hola mundo`;
// console.log(encripytBase64(palabv));
// console.log(decryptBase64(encripytBase64(palabv)))


module.exports = {
    encripytBase64,
    decryptBase64
};

/*
    NOTA: Al usar el valor elemental de la funcion en JS btoa este solo admite los caracteres 
    existentes ASCII, por ende los emojis no entran en esta sección, no obstante,
    existe un medio para poder utilizar emojis y poderlos encriptar, esto siendo 
    la transformacion del valor alfanumerico de un emoji en valores numericos.

    Este no es llevado acabo aqui, pero se veria algo asi:
    function encripytBase64(texto) {
        const encoder = new TextEncoder(); -> Se usa para poder convertir una cadena de caracteres a una secuencia de bytes dada una codificacion, esta de manera predeterminada en UTF-8
        const bytes = encoder.encode(texto); -> Convierte el texto en la cadena de bytes con el metodo .encode() en valor unicode de modo de arreglo(array)
        return btoa(String.fromCharCode.apply(null, bytes)); -> Crea una cadena apartir de los valores unicode {String.fromCharCode} y .apply('', '') valor que tomara y el segundo el array
    }

    Para desencriptarlo usariamos un medio algo asi tendriamos que hacer lo inverso aplicado en la encriptacion 
    function decryptBase64(encodedText) {
        const decodedBytes = atob(encodedText);
        const decodedString = new TextDecoder().decode(new Uint8Array(decodedBytes.split('').map(char => char.charCodeAt(0)))); -> Este medio usa arreglo de caracteres y mediante su valor obtiene el valor unicode y seguidamente crea un arreglo ded medios unicode de 8 bits, luego lo decodifica con el textDecoder
        return decodedString;
    }

    Enlace relacionado: https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
 */
