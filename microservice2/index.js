const express = require('express');
const dotenv = require("dotenv");
const { displayLanding, generateReverseString } = require('./controllers');
const app = express()
dotenv.config();
const port = process.env.PORT || 5000

app.get('/', displayLanding);
app.get('/reverse', generateReverseString);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
