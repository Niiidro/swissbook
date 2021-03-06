const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res, next) {

    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(400).send({success:false, message:'User does not exist.'});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({success:false, message:'Incorrect password.'});

    req.session.uuid = user._id;

    res.send({ success:true });
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(req)
}

module.exports = router;
exports.validate = validate;