const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const { displayLanding, generateReverseStringAndRandomNumber } = require('./controllers');
const app = express()
dotenv.config();
const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', displayLanding);
app.post('/reverse-random', generateReverseStringAndRandomNumber);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
