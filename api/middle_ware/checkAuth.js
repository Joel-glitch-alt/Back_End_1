const jwt = require ('jsonwebtoken');

const checkAuth = (req, res)=>{
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded;
    } catch (err) {
         return res.status(401).json({
            message:"Auth faill!"
        })
    }
    
}



module.exports = checkAuth