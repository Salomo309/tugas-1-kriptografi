import React, { useState } from "react";

function App() {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [cipher, setCipher] = useState("vigenere");
  const [inputtype, setInputType] = useState("text");

  const handleEncrypt = () => {
    // const encrypted = encrypt(plaintext, key, cipher);
    // setCiphertext(encrypted);
  };

  const handleDecrypt = () => {
    // const decrypted = decrypt(ciphertext, key, cipher);
    // setPlaintext(decrypted);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800 text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Welcome to CipherWeb!</h1>

      <div className="flex flex-col mb-4">
        <label htmlFor="inputtype" className="mb-2 text-lg">
          Input type
        </label>
        <select
          id="inputtype"
          value={inputtype}
          onChange={(e) => setInputType(e.target.value)}
          className="border p-2 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="text">text</option>
          <option value="file">file</option>
        </select>
      </div>

      {/* Conditionally render div based on inputtype */}
      {inputtype === "text" ? (
        <div className="flex flex-col mb-4">
          <label htmlFor="plaintext" className="mb-2 text-lg">
            Plain text
          </label>
          <textarea
            id="plaintext"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            className="border p-2 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
      ) : (
        <div className="flex flex-col mb-4">
          <label htmlFor="file-input" className="mb-2 text-lg">
            File
          </label>
          <input
            type="file"
            id="file-input"
            className="border p-2 rounded-md focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
      )}

      <div className="flex flex-col mb-4">
        <label htmlFor="cipher" className="mb-2 text-lg">
          Cipher
        </label>
        <select
          id="cipher"
          value={cipher}
          onChange={(e) => setCipher(e.target.value)}
          className="border p-2 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="vigenere">Vigenere Cipher</option>
          <option value="varianvigenere">Varian Vigenere Cipher</option>
          <option value="extendedvigenere">Extended Vigenere Cipher</option>
          <option value="playfair">Playfair Cipher</option>
          <option value="affine">Affine Cipher</option>
          <option value="hill">Hill Cipher</option>
          <option value="super">Super Enkripsi</option>
        </select>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="key" className="mb-2 text-lg">
          Key
        </label>
        <input
          type="text"
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border p-2 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleEncrypt}
          className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 active:ring-blue-800 active:ring-opacity-50"
        >
          Encrypt
        </button>
        <button
          onClick={handleDecrypt}
          className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 active:ring-blue-600 active:ring-opacity-50"
        >
          Decrypt
        </button>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="ciphertext" className="mb-2 text-lg">
          Cipher text:
        </label>
        {ciphertext}
        {/* <textarea
          id="ciphertext"
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
          className="border p-2 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
        /> */}
      </div>
    </div>
  );
}

export default App;
