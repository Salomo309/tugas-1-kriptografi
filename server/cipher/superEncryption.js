function encrypt(plainText, key, k) {
    // Fungsi untuk mengenkripsi teks dengan Caesar Cipher
    function extendedVig(plainText, key) {
        let encryptedText = '';
        for (let i = 0; i < plainText.length; i++) {
            let char = plainText.charCodeAt(i);
            let keyChar = key.charCodeAt(i % key.length);

            let encryptedChar = (char + keyChar) % 256;
            encryptedText += String.fromCharCode(encryptedChar);
        }
        return encryptedText;
    }

    function transposeCipher(encryptedText, k) {
        let transposedText = '';
        let rows = Math.ceil(encryptedText.length / k);
        let padding = rows * k - encryptedText.length;

        let matrix = [];
        let index = 0;
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < k; j++) {
                if (index < encryptedText.length) {
                    row.push(encryptedText.charAt(index));
                } else {
                    row.push('z');
                }
                index++;
            }
            matrix.push(row);
        }

        // Menukar kolom
        for (let j = 0; j < k; j++) {
            for (let i = 0; i < rows; i++) {
                transposedText += matrix[i][j];
            }
        }

        return transposedText;
    }

    // process
    let extended = extendedVig(plainText, key);
    let transposedText = transposeCipher(extended, k);

    return transposedText;
}


function decrypt(encryptedText, key, k) {
    function transposeDecipher(encryptedText, k) {
        let transposedText = '';
        let rows = Math.ceil(encryptedText.length / k);

        let matrix = [];
        let index = 0;
        for (let j = 0; j < k; j++) {
            let col = [];
            for (let i = 0; i < rows; i++) {
                col.push(encryptedText.charAt(index));
                index++;
            }
            matrix.push(col);
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < k; j++) {
                transposedText += matrix[j][i];
            }
        }

        return transposedText;
    }

    function inverseVig(encryptedText, key) {
        let decryptedText = '';
        for (let i = 0; i < encryptedText.length; i++) {
            let char = encryptedText.charCodeAt(i);
            let keyChar = key.charCodeAt(i % key.length);

            let decryptedCharCode = (char - keyChar + 256) % 256;
            decryptedText += String.fromCharCode(decryptedCharCode);
        }
        return decryptedText;
    }

    let transposedText = transposeDecipher(encryptedText, k);
    let decryptedText = inverseVig(transposedText, key);

    return decryptedText;
}

// Contoh penggunaan
// let plainText = "hellows";
// let key = "key";
// let k = 3;
// let encryptedText = encrypt(plainText.toLowerCase(), key.toLowerCase(), k);
// let decryptedText = decrypt(encryptedText, key, k);
// console.log("Ciphertext:", encryptedText);
// console.log("Plaintext:", decryptedText);

module.exports = {
    encrypt,
    decrypt
};
