const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products', productController.updateProduct); // Changed to use body
router.delete('/products', productController.deleteProduct); // Changed to use body

module.exports = router;