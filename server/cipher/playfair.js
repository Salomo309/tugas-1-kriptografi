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
            cleanText += text[i].toLowerCase();
        }
    }
    return cleanText;
}

function generateKey(text) {
    let cleanText = '';
    let alphabet = 'abcdefghiklmnopqrstuvwxyz';
    plaintext = alphabeting(text);

    for (let i = 0; i < plaintext.length; i++) {
        let c = plaintext.charAt(i);
        if (c !== 'j' && c !== 'J' && cleanText.indexOf(c) === -1) {
            cleanText += c;
        }
    }

    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet.charAt(i);
        if (cleanText.indexOf(letter) === -1) {
            cleanText += letter;
        }
    }

    let matrix = [];
    for (let i = 0; i < cleanText.length; i += 5) {
        matrix.push(cleanText.substring(i, i + 5).split(''));
    }

    return matrix;
}

function prepareText(text) {
    newText = alphabeting(text);
    let noJ = '';

    for (let i = 0; i < newText.length; i++) {
        let c = newText.charAt(i);
        if (c == 'j') {
            noJ += 'i';
        } else {
            if (c == 'J') {
                noJ += 'I';
            } else {
                noJ += c;
            }
        }
    }

    let modified = '';
    for (let i = 0; i < noJ.length; i += 2) {
        modified += noJ.charAt(i);
        if (noJ.charAt(i) === noJ.charAt(i+1)) {
            modified += 'x';
        }
        modified += noJ.charAt(i+1);
    }


    if (modified.length % 2 !== 0) {
        modified += 'x';
    }

    return modified;
}

// Finding Position
function findPos(key, c) {
    for (let row = 0; row < key.length; row++) {
        let foundCol = key[row].indexOf(c);
        if (foundCol !== -1) {
            return { row: row, col: foundCol };
        }
    }
    return null;
}

function encrypt(plaintext, keyText) {
    key = generateKey(keyText);
    text = prepareText(plaintext);

    let ciphertext = '';

    for (let i = 0; i < text.length; i += 2) {
        let c1 = text.charAt(i);
        let c2 = text.charAt(i + 1);

        let { row: row1, col: col1 } = findPos(key, c1);
        let { row: row2, col: col2 } = findPos(key, c2);

        if (row1 === row2) {
            col1 = (col1 + 1) % 5;
            col2 = (col2 + 1) % 5;
        } else if (col1 === col2) {
            row1 = (row1 + 1) % 5;
            row2 = (row2 + 1) % 5;
        } else {
            let temp = col1;
            col1 = col2;
            col2 = temp;
        }

        ciphertext += key[row1][col1];
        ciphertext += key[row2][col2];
    }

    return ciphertext;
}


function decrypt(ciphertext, keyText) {
    key = generateKey(keyText)
    let plaintext = '';

    for (let i = 0; i < ciphertext.length; i += 2) {
        let c1 = ciphertext.charAt(i);
        let c2 = ciphertext.charAt(i + 1);

        let { row: row1, col: col1 } = findPos(key, c1);
        let { row: row2, col: col2 } = findPos(key, c2);

        if (row1 === row2) {
            col1 = (col1 - 1 + 5) % 5;
            col2 = (col2 - 1 + 5) % 5;
        } else if (col1 === col2) {
            row1 = (row1 - 1 + 5) % 5;
            row2 = (row2 - 1 + 5) % 5;
        } else {
            let temp = col1;
            col1 = col2;
            col2 = temp;
        }

        plaintext += key[row1][col1];
        plaintext += key[row2][col2];
    }

    return plaintext;

}

module.exports = {
    encrypt,
    decrypt,
};


// msg = 'temui ibu nanti malam';
// key = 'JALAN GANESHA SEPULUH';
// console.log(encrypt(msg, key));
// let ciphertext = encrypt(msg, key);
// console.log(decrypt(ciphertext, key));

// let msg = 'satria saputra saragih';
// let key = 'JALAN GANESHA SEPULUH';
// // console.log(encrypt(msg, key));
// let encrypted = encrypt(msg, key);
// let decrypted = decrypt(encrypted, key);
// console.log(msg + ' -> ' +encrypted + " -> " + decrypted);

