const jwt = require ('jsonwebtoken');

const checkAuth = (req, res, next)=>{
    try {
        next()
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY)
         req.userData = decoded;
    } catch (err) {
        next()
         return res.status(401).json({
            message:"Auth faill!"
        })
    }
    
}



module.exports = checkAuth