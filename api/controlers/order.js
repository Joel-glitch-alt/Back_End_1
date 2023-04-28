const prisma = require("../../prisma-connect")

const getOrders = async (req, res, next) => {
    try {
      const orders = await prisma.order.findMany({})
      if(orders.length > 0) {
        res.status(200).json({
            message: 'Order found',
            orders
        })
      } else {
        res.status(200).json({
            message: 'No Found Order!'
        })
      }
    } catch (err) {
        console.log(err)
    }
}


const addOrders = async(req, res,next) =>{
    const {  userId, items, address, country,cost } = req.body
    try{
        await prisma.order.create({
            data: {
                userId,
                items,
                address,
                country,
                cost
            }
        })
        res.status(201).json({
            message:"'New Order Added!!"
        })
    } catch (err) {
        console.log(err)
    }
}

const deleteOrderById = async(req,res,next) =>{
   const id = (req.body.id)
   try {
    const deleteOrder = await prisma.Order.delete({
        where: {
            id: id
        }
    })
    res.status(200).json({deleteOrder })
    } catch (err) {
        console.log(err)
        return res.status(500).json({err:'Oreder deleted!'})
   }
}


const getOrderById = async(req,res,next) =>{
    const id = (req.body.id);
    try{
        const order = await prisma.orders.findUnique({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message:'Order found!!',
            order
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getOrders,
    addOrders,
    deleteOrderById,
    getOrderById
}