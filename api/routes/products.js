const express = require ('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({dest:'uploads/'});

const ProductsController = require('../controlers/product');

//Handling income messages
router.get('/', ProductsController.getProducts);
router.get('/:id', ProductsController.getProductById);
router.post('/' ,upload.single('productImage'), ProductsController.addProducts);
router.delete('/:id', ProductsController.deleteProductById);

module.exports = router



