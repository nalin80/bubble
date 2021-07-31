const express = require('express');
const router = express.Router();

router.use('/users',require('./user'));
router.use('/shop',require('./shop'));

module.exports = router;