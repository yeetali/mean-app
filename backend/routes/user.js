const express = require('express');
const router = express.Router();
const UserControler = require('../controlers/user')

router.post('/signup', UserControler.createUser);

router.post('/login', UserControler.login)

module.exports = router;