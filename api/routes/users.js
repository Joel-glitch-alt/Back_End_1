const express = require ('express');
const multer = require('multer');
const router =express.Router();
const upload = multer({dest:'uploads/'});

const UsersController = require('../controlers/users');

//Handling income messages
router.get('/', UsersController.getUsers);
router.get('/:id', UsersController.getUserById);
router.post('/signUp',upload.single('productImage'), UsersController.addUsers);
router.post('/signin', UsersController.userLogin)
router.delete('/:id', UsersController.deleteUserById);

module.exports = router;