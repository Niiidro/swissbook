const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser, validatePassword } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', validatePassword, async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({success: false , message: error.details[0].message});

    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send({success:false, message:'That user already exists!'});
    else 
    {
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send({"success":true, "user":_.pick(user, ['_id', 'name', 'email'])});
    }
});

module.exports = router