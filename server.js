const express = require('express');
const app = express();
const helmet = require('helmet');
const postgres = require('postgres');
const sql = postgres({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'pwd_game'
});
const argon2 = require('argon2');
require('dotenv').config();




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
});