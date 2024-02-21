const fs = require('fs');

/**
 * Membaca konten file sebagai header dalam bentuk string.
 *
 * @param {string} filePath Lokasi file yang akan dibaca.
 * @returns {Promise<string>} Promise yang mengembalikan header dalam bentuk string.
 */
function readFileHeader(filePath) {
  return new Promise((resolve, reject) => {
    let header = '';
    const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

    stream.on('data', chunk => {
      header += chunk;
    });

    stream.on('end', () => {
      resolve(header);
    });

    stream.on('error', error => {
      reject(error);
    });
  });
}

// Contoh penggunaan:
readFileHeader('package.json')
  .then(header => {
    console.log('Header (bytes):', header);
    console.log(typeof(header))
    // Lakukan sesuatu dengan header, misalnya analisis atau pemrosesan lebih lanjut
  })
  .catch(error => {
    console.error('Error reading file:', error);
  });
