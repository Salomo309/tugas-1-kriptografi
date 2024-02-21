import React, { useState } from "react";
import axios from "axios";

function App() {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [m, setM] = useState();
  const [b, setB] = useState();
  const [k, setK] = useState();
  const [cipher, setCipher] = useState("vigenere");
  const [inputtype, setInputType] = useState("text");
  const [matrix, setMatrix] = useState([[0]]);
  const [fileExtension, setFileExtension] = useState("");
  // const [header, setHeader] = useState("");

  const ciphertextToBlob = () => {
    const uint8Array = new TextEncoder().encode(ciphertext);
    const ciphertextBlob = new Blob([uint8Array], {
      type: "application/octet-stream",
    });
    return ciphertextBlob;
  };

  const downloadCiphertext = () => {
    // Create a Blob containing the ciphertext data
    const blob = ciphertextToBlob();

    // Parse the header to extract file extension
    const headers = ciphertext.split("\n");
    let fileExtension = "dat"; // Default extension if not found
    for (const header of headers) {
      if (header.startsWith("Content-Disposition")) {
        const match = header.match(/filename="(.+?)"/);
        if (match && match[1]) {
          const filenameParts = match[1].split(".");
          if (filenameParts.length > 1) {
            fileExtension = filenameParts.pop();
          }
        }
        break; // No need to continue parsing headers once we've found the filename
      }
    }

    // Create a file name for download
    let fileName = "ciphertext";

    // Append the original file extension to the file name
    fileName += `.${fileExtension}`;

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please select a file.");
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    setFileExtension(file.name.split(".").pop().toLowerCase());

    if (cipher !== "extendedvigenere" && cipher !== "super") {
      if (fileExtension !== "txt") {
        alert("Please select a .txt file.");
        e.target.value = null;
        return;
      }
    }

    reader.onload = async (e) => {
      const contents = e.target.result;
      setPlaintext(contents);

      try {
        const response = await axios.post("/readheader", { header: contents });
        setPlaintext(response.data);
        // setHeader(response.data);
        // console.log("Header (bytes):", header);
      } catch (error) {
        console.error("Error reading file header:", error);
      }
    };
    reader.readAsText(file);
  };

  const addMatrixSize = () => {
    const newMatrix = matrix.map((row) => [...row, 0]);
    setMatrix([...newMatrix, Array(newMatrix[0].length).fill(0)]);
  };

  const removeMatrixSize = () => {
    if (matrix.length > 1) {
      const newMatrix = [...matrix];
      newMatrix.pop();

      const numColumns = newMatrix[0].length;
      const updatedMatrix = newMatrix.map((row) =>
        row.slice(0, numColumns - 1)
      );

      setMatrix(updatedMatrix);
    }
  };

  const handleMatrixChange = (i, j, value) => {
    const newMatrix = matrix.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        if (rowIndex === i && colIndex === j) {
          return value;
        }
        return col;
      })
    );
    setMatrix(newMatrix);
  };

  const renderMatrixInputs = () => {
    return (
      <div className="matrix-inputs">
        <div className="my-2">
          <button
            onClick={addMatrixSize}
            className="px-4 py-2 bg-blue-500 text-white text-xl rounded-md mr-2"
          >
            +
          </button>
          <button
            onClick={removeMatrixSize}
            className="px-4 py-2 bg-red-500 text-white text-xl rounded-md mr-2"
          >
            -
          </button>
        </div>
        {matrix.map((row, i) => (
          <div key={i} className="flex">
            {row.map((col, j) => (
              <input
                key={j}
                type="text"
                value={isNaN(matrix[i][j]) ? "" : matrix[i][j]} // Ensure NaN values are empty strings
                onChange={(e) =>
                  handleMatrixChange(
                    i,
                    j,
                    e.target.value === "" ? 0 : parseInt(e.target.value)
                  )
                }
                onKeyDown={(e) => {
                  // Allow backspace and left/right arrow key
                  if (
                    e.key === "Backspace" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight"
                  )
                    return;

                  // Allow only numeric input
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-12 h-12 text-center border-gray-500 border m-1 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const stringToBase64 = (str) => {
    // Convert the string to a byte array
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i));
    }
    // Convert the byte array to a Base64 string
    return btoa(String.fromCharCode.apply(null, byteArray));
  };

  const base64ToString = (base64) => {
    // Decode the Base64 string
    var decodedData = atob(base64);

    // Convert the decoded byte array to a string
    var str = "";
    for (var i = 0; i < decodedData.length; ++i) {
      str += String.fromCharCode(decodedData.charCodeAt(i) & 0xff);
    }

    return str;
  };

  const handleEncrypt = async () => {
    if (cipher === "affine") {
      try {
        const response = await axios.post(`/${cipher}/encrypt`, {
          plaintext,
          m: parseInt(m),
          b: parseInt(b),
        });
        setCiphertext(response.data);
      } catch (error) {
        console.error("Encryption failed:", error);
      }
    } else if (cipher === "hill") {
      try {
        const response = await axios.post(`/${cipher}/encrypt`, {
          plaintext,
          key: matrix,
        });
        setCiphertext(response.data);
      } catch (error) {
        console.error("Encryption failed:", error);
      }
    } else if (cipher === "super") {
      try {
        const response = await axios.post(`/${cipher}/encrypt`, {
          plaintext,
          key,
          k: parseInt(k),
        });
        setCiphertext(stringToBase64(response.data));
      } catch (error) {
        console.error("Encryption failed:", error);
      }
    } else {
      try {
        const response = await axios.post(`/${cipher}/encrypt`, {
          plaintext,
          key,
        });
        cipher === "extendedvigenere"
          ? setCiphertext(stringToBase64(response.data))
          : setCiphertext(response.data);
      } catch (error) {
        console.error("Encryption failed:", error);
      }
    }
  };

  const handleDecrypt = async () => {
    if (cipher === "affine") {
      try {
        const response = await axios.post(`/${cipher}/decrypt`, {
          encrypted: ciphertext,
          m: parseInt(m),
          b: parseInt(b),
        });
        setCiphertext(response.data);
      } catch (error) {
        console.error("Decryption failed:", error);
      }
    } else if (cipher === "hill") {
      try {
        const response = await axios.post(`/${cipher}/decrypt`, {
          encrypted: ciphertext,
          key: matrix,
        });
        setCiphertext(response.data);
      } catch (error) {
        console.error("Decryption failed:", error);
      }
    } else if (cipher === "super") {
      try {
        const response = await axios.post(`/${cipher}/decrypt`, {
          encrypted: base64ToString(ciphertext),
          key,
          k: parseInt(k),
        });
        setCiphertext(response.data);
      } catch (error) {
        console.error("Decryption failed:", error);
      }
    } else {
      try {
        const response = await axios.post(`/${cipher}/decrypt`, {
          encrypted:
            cipher === "extendedvigenere"
              ? base64ToString(ciphertext)
              : ciphertext,
          key,
        });
        setCiphertext(response.data);
      } catch (error) {
        console.error("Decryption failed:", error);
      }
    }
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
            onChange={(e) => handleFileChange(e)}
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
          <option value="autokeyvigenere">Auto-Key Vigenere Cipher</option>
          <option value="extendedvigenere">Extended Vigenere Cipher</option>
          <option value="playfair">Playfair Cipher</option>
          <option value="affine">Affine Cipher</option>
          <option value="hill">Hill Cipher</option>
          <option value="super">Super Enkripsi</option>
        </select>
      </div>

      {cipher === "affine" && (
        <div className="flex flex-row mb-4">
          <div className="flex flex-col mr-4">
            <label htmlFor="m" className="mb-2 text-lg">
              m
            </label>
            <input
              type="text"
              id="m"
              value={m}
              onChange={(e) => setM(e.target.value)}
              className="border p-2 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="b" className="mb-2 text-lg">
              b
            </label>
            <input
              type="text"
              id="b"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="border p-2 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
        </div>
      )}

      {cipher === "hill" && (
        <div className="flex flex-col mb-4">
          <label htmlFor="key" className="mb-2 text-lg">
            Key
          </label>
          {renderMatrixInputs()}
        </div>
      )}

      {cipher === "super" && (
        <div className="flex flex-row mb-4">
          <div className="flex flex-col mr-4">
            <label htmlFor="key" className="mb-2 text-lg">
              key
            </label>
            <input
              type="text"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="border p-2 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="k" className="mb-2 text-lg">
              k
            </label>
            <input
              type="text"
              id="k"
              value={k}
              onChange={(e) => setK(e.target.value)}
              className="border p-2 rounded-md bg-gray-700 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
        </div>
      )}

      {cipher !== "affine" && cipher !== "hill" && cipher !== "super" && (
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
      )}

      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={handleEncrypt}
            className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 active:ring-blue-800 active:ring-opacity-50 mr-2"
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
        <div>
          <button
            onClick={downloadCiphertext}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 active:ring-green-600 active:ring-opacity-50"
          >
            Download Result
          </button>
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="ciphertext" className="mb-2 text-lg">
          Result:
        </label>
        {ciphertext === "" ? "no result yet" : ciphertext}
      </div>
    </div>
  );
}

export default App;
