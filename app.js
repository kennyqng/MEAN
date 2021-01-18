const express = require ("express");
const mongoose = require ("mongoose");
const passport = require ("passport");
const cors = require ("cors");
const bodyParser = require ("body-parser");
const path = require ("path");
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connect to database '+config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Connect to database '+err);
});

const app = express();

const users = require('./routes/users');

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req, res) => {
    res.send("Welcome to our empty page.");
});

app.listen(port, () => {
    console.log('Server started on port '+port);
});

