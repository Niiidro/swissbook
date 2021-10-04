const Joi = require('joi');
const Mongoose = require('mongoose');
const PasswordValidator = require('password-validator');

const User = Mongoose.model('User', new Mongoose.Schema({

    name: {
        type: String,
        required: false,
        minlenght: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validatePassword(req, res, next) {
    const schema = new PasswordValidator();
    // prettier-ignore
    schema
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols();
    if (schema.validate(req.body.password)) {
        next();
    } else {
        res.status(409).send({
            'success':false , message:'The Password needs to be at least 8 characters with one uppercase, one lowercase, one digit and one symbol '
        });
    }
}

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(1).max(50).required(),
    });
    return schema.validate(user)
}

exports.User = User;
exports.validateUser = validateUser;
exports.validatePassword = validatePassword;