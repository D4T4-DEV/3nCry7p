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