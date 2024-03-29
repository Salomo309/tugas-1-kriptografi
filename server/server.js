const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const readheaderRoute = require("./routes/readheader.route");
const vigenereRoute = require("./routes/vigenere.route");
const autoKeyVigenereRoute = require("./routes/autoKeyVigenere.route");
const extendedVigenereRoute = require("./routes/extendedVigenere.route");
const playfairRoute = require("./routes/playfair.route");
const affineRoute = require("./routes/affine.route");
const hillRoute = require("./routes/hill.route");
const superEncryptionRoute = require("./routes/superEncryption.route");

// middleware
const corsOptions = {
  origin: ["http://localhost:3000"], // frontend URI (ReactJS)
};
app.use(express.json());
app.use(cors(corsOptions));

// Define routes or middleware as needed

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/readheader", readheaderRoute);
app.use("/vigenere", vigenereRoute);
app.use("/autokeyvigenere", autoKeyVigenereRoute);
app.use("/extendedvigenere", extendedVigenereRoute);
app.use("/playfair", playfairRoute);
app.use("/affine", affineRoute);
app.use("/hill", hillRoute);
app.use("/super", superEncryptionRoute);
