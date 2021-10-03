const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res, next) {
    console.log("logout")
    if(req.session) await User.findById(req.session.uuid).deleteOne().exec();
});

module.exports = router;