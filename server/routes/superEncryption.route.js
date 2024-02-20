const express = require("express");
const router = express.Router();
const { encrypt, decrypt } = require("../cipher/superEncryption");

router.route("/encrypt").post(async (req, res, next) => {
  const { plaintext, key, k} = req.body;
  const ciphertext = encrypt(plaintext, key, k);
  res.send(ciphertext);
});

router.route("/decrypt").post(async (req, res, next) => {
  const { encrypted, key, k} = req.body;
  const ciphertext = decrypt(encrypted, key, k);
  res.send(ciphertext);
});

module.exports = router;
