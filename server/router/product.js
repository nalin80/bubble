const express = require('express');
const router = express.Router();

const auth = require('../config/auth');
const productController = require('../controllers/productController');

router.post('/addProductCategory',auth,productController.addProductCategories);
router.post('/deleteProductCategory',auth,productController.deleteCategories);

// router.get('/getProductCategory',auth,productController.getCategories);

/******************************************************* */
router.get('/getProduct/:id',auth,productController.getProducts);
router.post('/addProduct',auth,productController.addProduct);
router.post('/deleteProduct/:id',auth,productController.deleteProduct);
router.post('/updateProduct/:id',auth,productController.updateProduct);

module.exports = router;