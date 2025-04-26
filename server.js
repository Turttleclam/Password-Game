const express = require("express");
const path = require("path");
const app = express();

const path = require('path');
const helmet = require('helmet');
const postgres = require('postgres');

app.use(helmet());

const sql = postgres({
  username: "postgres",
  password: "password",
  database: "pwd_game",
});
const argon2 = require("argon2");
require("dotenv").config();

// app.use(express.static('public'));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));

app.use('/style', express.static(path.join(__dirname + `/style`)));


app.get('/data', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM users INNER JOIN fav_comic USING (user_id)`;
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
