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

// generating key
function generateKey(plaintext, key) {
    let newKey = '';
    for (let i = 0; i < key.length; i++) {
        newKey += key.charAt(i);
    }

    for (let i = 0; i < plaintext.length - key.length; i++) {
        newKey += plaintext.charAt(i);
    }

    return newKey;
}

// encrypting function
function encrypt(plaintext, key) {
    let ciphertext = '';
    let j = 0;
    message = alphabeting(plaintext);
    newKey = generateKey(plaintext, key);

    for (let i = 0; i < message.length; i++) {
        c = message.charAt(i);

        if (isLowerCase(c)) {
            ciphertext += String.fromCharCode((c.charCodeAt(0) + newKey.toLowerCase().charCodeAt(j) - 194) % 26 + 97);
        } else {
            ciphertext += String.fromCharCode((c.charCodeAt(0) + newKey.toUpperCase().charCodeAt(j) - 130) % 26 + 65);
        }

        j += 1;
        j = j % newKey.length;
    }

    return ciphertext;
}

// decrypting function
function decrypt(ciphertext, key) {
    let plaintext = '';
    let j = 0;
    message = alphabeting(ciphertext);
    newKey = generateKey(ciphertext, key);

    for (let i = 0; i < message.length; i++) {
        c = message.charAt(i);

        if (isLowerCase(c)) {
            let decryptedCharCode = (c.charCodeAt(0) - newKey.toLowerCase().charCodeAt(j) + 26) % 26;
            plaintext += String.fromCharCode(decryptedCharCode + 97);
        } else {
            let decryptedCharCode = (c.charCodeAt(0) - newKey.toUpperCase().charCodeAt(j) + 26) % 26;
            plaintext += String.fromCharCode(decryptedCharCode + 65);
        }

        j += 1;
        j = j % newKey.length;
    }

    return plaintext;
}

module.exports = {
    encrypt,
    decrypt
};

// msg = 'negarapenghasilminyakmentahdidunia';
// key = 'indonegarapenghasilminyakmentahdid'
// let encryptedMsg = encrypt(msg, key);
// console.log("Encrypted:", encryptedMsg);
// console.log("Decrypted:", decrypt(encryptedMsg, key));
