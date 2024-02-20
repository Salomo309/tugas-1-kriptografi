const express = require("express");
const router = express.Router();
const { encrypt, decrypt } = require("../cipher/vigenere");

router.route("/encrypt").post(async (req, res, next) => {
  const { plaintext, key} = req.body;
  const ciphertext = encrypt(plaintext, key);
  res.send(ciphertext);
});

router.route("/decrypt").post(async (req, res, next) => {
  const { encrypted, key} = req.body;
  const ciphertext = decrypt(encrypted, key);
  res.send(ciphertext);
});

module.exports = router;
