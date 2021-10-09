const Joi = require('joi');
Joi.objectId = require('joi-objectid');

const mongoose = require('mongoose');
const sessions = require('express-session');
const config = require('config');

const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');

const home = require('./routes/home');
const express = require("express");
const MongoStore = require('connect-mongo');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/swissbook', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong!', err));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: config.get('privatekey'),
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: new MongoStore({ mongoUrl:'mongodb://localhost:27017/swissbook', ttl: 14 * 24 * 60 * 60, autoRemove:'native' })
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/', home);

const options = {
    origin: ['http://localhost:80']
};

app.use(cors(options));

if (!config.get('privatekey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}



const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));