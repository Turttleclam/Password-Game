const express = require("express");
const app = express();
<<<<<<< HEAD
const helmet = require("helmet");
const postgres = require("postgres");
=======
const path = require('path');
const helmet = require('helmet');
const postgres = require('postgres');
>>>>>>> c862294 (Got the server, but it isn't picking up the css file)

const sql = postgres({
  username: "postgres",
  database: "pwd_game",
});
const argon2 = require("argon2");
require("dotenv").config();

// app.use(express.static('public'));
<<<<<<< HEAD
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "public" + "index.html"));
=======
app.use('/style', express.static(`/style/styles.css`));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public' + '/index.html'));
>>>>>>> c862294 (Got the server, but it isn't picking up the css file)
});
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/style' + '/styles.css'));
// });

const port = 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
