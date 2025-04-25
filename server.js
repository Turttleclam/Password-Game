const express = require('express');
const app = express();
const helmet = require('helmet');
const postgres = require('postgres');

const sql = postgres({
    username: 'postgres',
    database: 'pwd_game'
});
const argon2 = require('argon2');
require('dotenv').config();

app.get('/public', (req, res) => {
    res.send('/index.html');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
});