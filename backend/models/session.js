const Joi = require('joi');
const Mongoose = require('mongoose');

const Session = Mongoose.model('Session', new Mongoose.Schema({
    sessionid: {
        type: String,
        required: true,
        minlenght: 5,
        maxlength: 50
    },
    name: {
        type: String,
        required: true,
        minlenght: 5,
        maxlength: 50
    }
}));

function validateUser(user) {
    const schema = Joi.object({
        sessionid: Joi.string().min(5).max(50).required(),
        name: Joi.string().min(5).max(50).required()
    });
    return schema.validate(user)
}

exports.Session = Session;
exports.validate = validateUser;