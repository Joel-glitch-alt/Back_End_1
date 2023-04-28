// const { log } = require('console');
const prisma = require('../../prisma-connect');

const bcrypt = require('bcrypt');

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
    } catch (err) {
        console.log(err)
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
    deleteUserById,
    getUserById
}