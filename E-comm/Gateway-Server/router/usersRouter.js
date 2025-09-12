const express = require('express');
const {getUsers} = require('../controllers/users/getUsersController')
const router = express.Router();



router.get('/', getUsers)






module.exports = router