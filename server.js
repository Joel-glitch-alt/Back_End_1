
//importing 
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser =  require('body-parser');
const cors = require('cors');




//importing Root routes!!
const usersRoutes = require('./api/routes/users');
const productsRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//middle ware...
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// app.use('*/:route', (req, res, next) => {
//     console.log(req.params.route)
//     next()
// })

//handling request routes...
app.use('/users',usersRoutes)
app.use('/products',productsRoutes)
app.use('/orders',orderRoutes)

//handling error
app.use((req,res,next)=>{
    const error = new Error('Not Found!');
    error.status(404);
    next(error);
});
//Error handling 2
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});
//port route....
const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log("running on port "+port +" ....")
});