const express = require("express");
const path = require("path");
const app = express();

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

app.use('/style', express.static(path.join(__dirname + `/style`)));

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"))
});

app.get('/data', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM users INNER JOIN fav_comic USING (user_id)`;
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/search/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const result = await sql`SELECT * FROM users INNER JOIN fav_comic USING (user_id) WHERE username ILIKE ${name}`;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/submit', async (req, res) => {
  const { username, pwd } = req.body;
  console.log(req.body);
  try {
  const result = await sql`UPDATE users SET password = ${pwd} WHERE username = ${username}`;
  res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
