const express = require ('express');
const router =express.Router();
const OrdersControler = require('../controlers/order')


router.get('/', OrdersControler.getOrders)
router.post('/', OrdersControler.addOrders)
router.delete('/', OrdersControler.deleteOrderById)
router.get('/', OrdersControler.getOrderById)
    

module.exports = router;