const express = require("express");
const router = express.Router();
const { encrypt, decrypt } = require("../cipher/affine");

router.route("/encrypt").post(async (req, res, next) => {
  const { plaintext, m, b } = req.body;
  const ciphertext = encrypt(plaintext, m, b);
  res.send(ciphertext);
});

router.route("/decrypt").post(async (req, res, next) => {
  const { plaintext, m, b } = req.body;
  const ciphertext = decrypt(plaintext, m, b);
  res.send(ciphertext);
});

module.exports = router;
