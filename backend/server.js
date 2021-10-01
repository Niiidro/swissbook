const Joi = require('joi');
Joi.objectId = require('joi-objectid');

const mongoose = require('mongoose');
const register = require('./routes/register');
const express = require("express");
const app = express();

mongoose.connect('mongodb://localhost:27017/swissbook', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong!', err));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/register', register);

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));