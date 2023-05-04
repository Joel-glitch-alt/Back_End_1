const express = require ('express');
const router =express.Router();
const OrdersControler = require('../controlers/order');
const checkAuth = require('../middle_ware/checkAuth')


router.get('/',checkAuth, OrdersControler.getOrders)
router.post('/',checkAuth, OrdersControler.addOrders)
router.delete('/',checkAuth, OrdersControler.deleteOrderById)
router.get('/', checkAuth,OrdersControler.getOrderById)
    

module.exports = router;