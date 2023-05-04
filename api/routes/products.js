const express = require ('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({dest:'uploads/'});
const checkAuth = require('../middle_ware/checkAuth')

const ProductsController = require('../controlers/product');

//Handling income messages
router.get('/', ProductsController.getProducts);
router.get('/:id', ProductsController.getProductById);
router.post('/',checkAuth, upload.single('productImage'), ProductsController.addProducts);
router.delete('/:id',checkAuth, ProductsController.deleteProductById);

module.exports = router



