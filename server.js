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
    const result = await sql`SELECT * FROM users INNER JOIN fav_comic USING (user_id) ORDER BY user_id LIMIT 100`;
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
  try {
    const hashed_pwd = await argon2.hash(pwd);


    const result = await sql`SELECT user_id FROM users WHERE username = ${username}`;
    const userId = result[0].user_id;
    const result1 = await sql`UPDATE users SET password = ${hashed_pwd} WHERE user_id = ${userId}`;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/create', async (req, res) => {
  const { username, pwd, fav_comic, char } = req.body;
  console.log(username);
  try {
  const result = await sql`INSERT INTO users(username, password) VALUES(${username}, ${pwd}) RETURNING user_id`;
  const newId = result[0].user_id;
  const result1 = await sql`INSERT INTO fav_comic(user_id, publisher, character) VALUES(${newId}, ${fav_comic}, ${char})`;
  console.log([result1]);
  // result & result1 are objects, res.json can only send one object/array at a time
  res.json([result, result1]);
  } catch (error) {
    res.status(500).send('Server Eror');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
