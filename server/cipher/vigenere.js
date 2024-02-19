// checking each character, harus alfabet, bukan angka, spasi, ataupun karakter lain
function isAlphabet(c) {
    return /^[a-zA-z]/.test(c) && c.length === 1;
}

// checking if c is uppercase or lower case
function isLowerCase(c) {
    if (c === c.toLowerCase()) {
        return true;
    }

    if (c === c.toUpperCase()) {
        return false;
    }
}

// clean plain text
function alphabeting(text) {
    let cleanText = '';
    for (let i = 0; i < text.length; i++) {
        if (isAlphabet(text[i])) {
            cleanText += text[i];
        }
    }
    return cleanText;
}

// encrypting function
function encrypt(plaintext, key) {
    let ciphertext = '';
    let j = 0;
    message = alphabeting(plaintext);

    for (let i = 0; i < message.length; i++) {
        c = message.charAt(i);

        if (isLowerCase(c)) {
            ciphertext += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 194) % 26 + 97);
        } else {
            ciphertext += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 130) % 26 + 65);
        }

        j += 1;
        j = j % key.length;
    }

    return ciphertext;
}

// decrypting function
function decrypt(plaintext, key) {
    let plaintext = '';
    let j = 0;
    message = alphabeting(plaintext);

    for (let i = 0; i < message.length; i++) {
        c = message.charAt(i);

        if (isLowerCase(c)) {
            let decrypted = (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j) + 26) % 26;
            plaintext += String.fromCharCode(decrypted + 97);
        } else {
            let decrypted = (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j) + 26) % 26;
            plaintext += String.fromCharCode(decrypted + 65);
        }

        j += 1;
        j = j % key.length;
    }

    return plaintext;
}

// plaintext = 'thisplaintext';
// key = 'sony'
// let encryptedplaintext = encrypt(plaintext, key);
// console.log("Encrypted:", encryptedplaintext);
// console.log("Decrypted:", decrypt(encryptedplaintext, key));
