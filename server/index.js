const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const router = require('./routes')
const db = require('./DB/db')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(cors())
app.use(bodyParser.json())
app.use(router);

require('dotenv').config();
// dotenv.config();

// connecting to the database
db()

// listening the server on port
app.listen(process.env.PORTSERVER, ()=>{
    console.log("running", process.env.PORTSERVER)
})
