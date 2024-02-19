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

function findX(m) {
    found = false;
    let i = 0;
    while (!found) {
        if (((m * i) % 26) === (1 % 26)) {
            found = true;
            return i;
        } else {
            i++;
        }
    }
}

function encrypt(plaintext, m, b) {
    let ciphertext = '';
    msg = alphabeting(plaintext);

    for (let i = 0; i < msg.length; i++) {
        c = msg.charAt(i);

        if (isLowerCase(c)) {
            ciphertext += String.fromCharCode((m * (c.charCodeAt(0) - 97) + b) % 26 + 97);
        } else {
            ciphertext += String.fromCharCode((m * (c.charCodeAt(0) - 65) + b) % 26 + 65);
        }
    }

    return ciphertext;
}

function decrypt(ciphertext, m, b) {
    x = findX(m);
    let plaintext = '';
    msg = alphabeting(ciphertext);

    for (let i = 0; i < msg.length; i++) {
        c = msg.charAt(i);

        if (isLowerCase(c)) {
            let decrypted = (x * (c.charCodeAt(0) - b - 97 + 26)) % 26;
            plaintext += String.fromCharCode(decrypted + 97);
        } else {
            let decrypted = (x * (c.charCodeAt(0) - b - 65 + 26)) % 26;
            plaintext += String.fromCharCode(decrypted + 65);
        }
    }

    return plaintext;
}

module.exports = {
    encrypt,
    decrypt
};


let plaintext = 'kripto';
let m = 5;
let b = 8
enc = encrypt(plaintext, m, b)
console.log(enc);
console.log(decrypt(enc, m, b));
