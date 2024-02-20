const math = require('mathjs');

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

function generateKey(n) {
    const key = [];
    for (let i = 0; i < n; i++) {
        key[i] = [];
        for (let j = 0; j < n; j++) {
            key[i][j] = Math.floor(Math.random() * 26);
        }
    }
    return key;
}

function encrypt(plaintext, key) {
    let cleanedText = alphabeting(plaintext);
    let numericText = [];

    for (let i = 0; i < cleanedText.length; i++) {
        numericText.push(cleanedText.charCodeAt(i) - 97);
    }

    // add padding
    let padding = key.length - (numericText.length % key.length);
    if (padding !== key.length) {
        for (let j = 0; j < padding; j++) {
            numericText.push(23);
        }
    }

    // slicing numeric
    let chunks = [];
    for (let i = 0; i < numericText.length; i += key.length) {
        chunks.push(numericText.slice(i, i + key.length));
    }

    // encrypting
    let ciphertext = '';
    for (let i = 0; i < chunks.length; i++) {
        let res = multiply(key, chunks[i]);
        res = res.map(num => num % 26);

        for (let j = 0; j < res.length; j++) {
            ciphertext += String.fromCharCode(res[j] + 97);
        }
    }

    return ciphertext;
}

function multiply(m1, m2) {
    try {
        return math.multiply(m1, m2);
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function determinant(matrix) {
    const n = matrix.length;
    if (n === 1) {
        return matrix[0][0];
    } else if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else {
        let det = 0;
        for (let j = 0; j < n; j++) {
            det += matrix[0][j] * cofactor(matrix, 0, j);
        }
        return det;
    }
}

function cofactor(matrix, row, col) {
    return Math.pow(-1, row + col) * minor(matrix, row, col);
}

function minor(matrix, row, col) {
    const subMatrix = [];
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        if (i !== row) {
            subMatrix.push(matrix[i].filter((_, index) => index !== col));
        }
    }
    return determinant(subMatrix);
}

function adjoint(matrix) {
    const n = matrix.length;
    const adj = [];
    for (let i = 0; i < n; i++) {
        adj[i] = [];
        for (let j = 0; j < n; j++) {
            adj[i][j] = cofactor(matrix, i, j);
        }
    }
    return transpose(adj);
}

function extendedEuclidean(a, b) {
    if (b === 0) {
        return [a, 1, 0];
    }

    const [gcd, x1, y1] = extendedEuclidean(b, a % b);

    const x = y1;
    const y = x1 - (Math.floor(a / b) * y1);

    return [gcd, x, y];
}

function modInverse(a, m) {
    const [gcd, x, y] = extendedEuclidean(a, m);
    if (gcd !== 1) {
        throw new Error("Inverse does not exist");
    }
    return (x + m) % m;
}

function inverseMatrix(matrix) {
    let det = determinant(matrix);

    while (det < 0) {
        det += 26;
    }

    if (det === 0) {
        throw new Error("The matrix is singular, inverse does not exist.");
    }

    // console.log(det)
    let detInverse = modInverse(det, 26);
    // console.log(detInverse)

    let adjMat = adjoint(matrix)

    const n = matrix.length;
    const inverse = [];
    for (let i = 0; i < n; i++) {
        inverse[i] = [];
        for (let j = 0; j < n; j++) {
            inverse[i][j] = adjMat[i][j] * detInverse;
        }
    }

    return inverse;
}

function transpose(matrix) {
    return matrix[0].map((_, col) => matrix.map(row => row[col]));
}

function decrypt(ciphertext, key) {
    let cleanedText = alphabeting(ciphertext);
    let numericText = [];

    for (let i = 0; i < cleanedText.length; i++) {
        numericText.push(cleanedText.charCodeAt(i) - 97);
    }

    // slicing numeric
    let chunks = [];
    for (let i = 0; i < numericText.length; i += key.length) {
        chunks.push(numericText.slice(i, i + key.length));
    }

    inverseKey = inverseMatrix(key);

    // decrypting
    let plaintext = '';
    for (let i = 0; i < chunks.length; i++) {
        let res = multiply(inverseKey, chunks[i]);
        res = res.map(num => {
            let result = num % 26;
            return result >= 0 ? result : result + 26;
        });

        for (let j = 0; j < res.length; j++) {
            plaintext += String.fromCharCode(res[j] + 97);
        }
    }

    return plaintext;
}

module.exports = {
    encrypt,
    decrypt,
};

// plaintext = 'hahahahahaha';
// let key = [[17,17,5,3],[21,18,21,2],[2,2,19,2],[9,9,2,16]];
// let encrypted = encrypt(plaintext, key);
// let decrypted = decrypt(encrypted, key);
// console.log(plaintext + ' -> ' + encrypted + ' -> ' + decrypted);
