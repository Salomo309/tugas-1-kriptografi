const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const header = req.body.header;
    res.send(header);
  } catch (error) {
    console.error("Error processing file header:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
