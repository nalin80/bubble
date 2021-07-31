const express = require('express');
const router = express.Router();
const auth = require('../config/auth');

const shopController = require('../controllers/shopController');

router.get('/getShop',auth,shopController.getShop);
router.post('/createShop',auth,shopController.createShop);
router.post('/deleteShop/:id',auth,shopController.deleteShop);
router.post('/updateShop/:id',auth,shopController.updateShop);

module.exports = router;