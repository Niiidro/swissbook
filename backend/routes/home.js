const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {

    let user = null;
    if (req.session.uuid) user = await User.findById(req.session.uuid);
    else return res.status(400).send({'success':false, message:'You are not logged in.'});
    if (!user) return res.status(400).send({'success':false, message:'You are not logged in.'});
    else return res.status(200).send({ 'success':true, message:'Welcome!' });
});

module.exports = router;