const express = require('express');
const router = express.Router();

router.use('/users',require('./user'));
router.use('/shop',require('./shop'));
router.use('/shop/products',require('./product'));

module.exports = router;