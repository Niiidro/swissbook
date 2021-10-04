const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res, next) {

    if(req.session) {
        req.session.destroy();
        return res.status(200).send({ "success":true });
    } else return res.status(400).send({ "success":false });
});

module.exports = router;