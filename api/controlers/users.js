// const { log } = require('console');
const prisma = require('../../prisma-connect');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const getUsers = async (req,res)=> {
    console.log('heree');
    try {
        const users = await prisma.user.findMany({})
        if(users.length > 0) {
            res.status(200).json({
                message: 'Found users',
                users
            })
        } else {
            res.status(200).json({
                message: 'No Found users'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err
        })
    }

}

const addUsers = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body
    try {
        bcrypt.hash(password, 10, async (error, hash) => {
            if(error) {
                res.status(500).json({
                    message: error
                })
            } else {
                await prisma.user.create({
                    data: {
                        firstname,
                        lastname,
                        username,
                        email,
                        password: hash
                    }
                })
                res.status(201).json({
                    message: 'New user created'
                })
                
            }
        })
       // return res.status(200).json({addUsers})
    } catch (err) {
        console.log(err)
        //return res.status(500).json({err: 'add user'})
    }
}

const userLogin =  async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    console.log(user)
    if(user.length < 1) {
        res.status(401).json({
            message:"Auth failed!"
        })
    } else {
        bcrypt.compare(password, user.password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
            if(result) {
                const token = jwt.sign(
                    {
                        email,
                        password
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn:"1hr"
                    }
                )
                return res.status(200).json({
                    message:"Authentication successful!",
                    token,
                    user
                })
            }
            res.status(401).json({
                message:"Auth failedddd"
            })
        })
    }
}







const deleteUserById = async (req, res) => {
    const id = (req.params.id)
    console.log(id);
    try {
        const deleteUser = await prisma.user.delete({
            where: {
              id: id
            },
          })
          return res.status(200).json({deleteUser})
    } catch (err) {
        console.log(err)
        return res.status(500).json({err: 'deleteUser err'})
    }
}

const getUserById = async (req, res,next) => {
    const id = req.params.id;    
    try{
        const user = await prisma.user.findUnique({
            where: {
              id 
            }
          })
          return res.status(200).json({
            message:'user found',
            user
          })
    }
    catch (err) {
      console.log(err)
    }
};

module.exports = {
    getUsers,
    addUsers,
    userLogin,
    deleteUserById,
    getUserById
}