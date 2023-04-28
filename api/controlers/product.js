// const { log } = require('console');
const prisma = require('../../prisma-connect');

const getProducts = async (req,res)=> {
    console.log('heree');
    try {
        const products = await prisma.product.findMany({
            include: {
                user: {}
            }
        });
        if(products.length > 0) {
            res.status(200).json({
                message: 'Found Product',
                products
            })
        } else {
            res.status(200).json({
                message: 'No Found Product!'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err
        })
    }

}

const addProducts = async (req, res) => {
    const { title, description, price, images, userId} = req.body
    try {
        await prisma.product.create({
            data: {
                title,
                price: parseInt(price) ,
                description,
                images,
                userId
            }
        })
        res.status(201).json({
            message: 'New product added!'
        })
    } catch (err) {
        console.log(err)
    }
}


const deleteProductById = async (req, res,next) => {
    const id = (req.params.id)
    console.log(id);
    try {
        const deleteProduct = await prisma.product.delete({
            where: {
              id: id
            }
          })
          return res.status(200).json({deleteProduct})
    } catch (err) {
        console.log(err)
        return res.status(500).json({err: 'deleteProduct err'})
    }
}

const getProductById = async (req, res,next) => {
    const id = (req.params.id);    
    try{
        const product = await prisma.product.findUnique({
            where: {
              id 
            }
          })
          return res.status(200).json({
            message:'Product found!',
            product
          })
    }
    catch (err) {
      console.log(err)
    }
};

module.exports = {
    getProducts,
    addProducts,
    deleteProductById,
    getProductById
}