// encrypting function
function encrypt(plainText, key) {
    let ciphertext = '';
    for (let i = 0, j = 0; i < plainText.length; i++) {
        let char = plainText.charCodeAt(i);
        let keyChar = key.charCodeAt(j % key.length);

        let encryptedCharCode = (char + keyChar) % 256;
        ciphertext += String.fromCharCode(encryptedCharCode);

        j++;
    }
    return ciphertext;
}

// decrypting function
function decrypt(encryptedText, key) {
    let plaintext = '';
    for (let i = 0, j = 0; i < encryptedText.length; i++) {
        let char = encryptedText.charCodeAt(i);
        let keyChar = key.charCodeAt(j % key.length);

        let decryptedCharCode = (char - keyChar + 256) % 256;
        plaintext += String.fromCharCode(decryptedCharCode);

        j++;
    }
    return plaintext;
}

module.exports = {
    encrypt,
    decrypt
};

// let plainText = "Hello World!";
// let key = "key";

// let encryptedText = encrypt(plainText, key);
// console.log("Teks terenkripsi:", encryptedText);
// let decryptedText = decrypt(encryptedText, key);
// console.log("Teks terdekripsi:", decryptedText);
